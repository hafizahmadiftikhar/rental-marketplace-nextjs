import dbConnect from "../../../../lib/mongodb.js";
import Property from "../../../../models/Property.js";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url, `http://${req.headers.get("host")}`);
    const postalCode = searchParams.get("postalCode");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 50;
    const skip = (page - 1) * limit;

    if (!postalCode) {
      return new Response(
        JSON.stringify({ message: "postalCode is required" }),
        { status: 400 }
      );
    }

    // Build search query - search in multiple fields
    const searchQuery = {
      $or: [
        { "location.postalCode": postalCode },
        { "location.postalCode": parseInt(postalCode) || 0 },
        { "location.fullAddress": { $regex: postalCode, $options: "i" } },
        { propertyName: { $regex: postalCode, $options: "i" } },
      ],
    };

    // Get total count
    const total = await Property.countDocuments(searchQuery);

    // Fetch properties with pagination
    const properties = await Property.find(searchQuery)
      .select("propertyName photos location address rentMin rentMax beds baths sqft")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return new Response(
      JSON.stringify({
        properties,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasMore: skip + properties.length < total,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (err) {
    console.error("Search API Error:", err);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch properties",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}