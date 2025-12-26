import dbConnect from "../../../../lib/mongodb.js";
import Property from "../../../../models/Property.js";

export async function GET(req) {
  try {
    await dbConnect();

    // Provide a base URL so new URL works correctly
    const { searchParams } = new URL(
      req.url,
      `http://${req.headers.get("host")}`
    );
    const postalCode = searchParams.get("postalCode");

    if (!postalCode) {
      return new Response(
        JSON.stringify({ message: "postalCode is required" }),
        { status: 400 }
      );
    }

    // If postal codes are strings in DB, remove Number()
    const properties = await Property.find({
      "location.postalCode": postalCode,
    }).sort({ createdAt: -1 });

    return new Response(JSON.stringify(properties), { status: 200 });
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
