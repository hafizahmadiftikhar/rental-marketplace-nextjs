import dbConnect from "../../../lib/mongodb.js";
import Property from "../../../models/Property.js";

export async function GET() {
  try {
    await dbConnect();
    // Fetch the first 5 properties, sorted by createdAt descending
    const properties = await Property.find({}).sort({ createdAt: -1 }).limit(4);
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Failed to fetch properties", error: err.message }), { status: 500 });
  }
}
