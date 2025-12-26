import dbConnect from "../../../lib/mongodb.js";
import Property from "../../../models/Property.js";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url, `http://${req.headers.get("host")}`);
    
    // Pagination parameters
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 50;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Property.countDocuments({});

    // Fetch only needed properties with pagination
    const properties = await Property.find({})
      .select("propertyName photos location address rentMin rentMax beds baths sqft") // Only select needed fields
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for faster queries

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
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" // Cache for 60 seconds
        },
      }
    );
  } catch (err) {
    console.error("Properties API Error:", err);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch properties",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}