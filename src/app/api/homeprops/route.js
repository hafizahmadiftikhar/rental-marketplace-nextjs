import dbConnect from "../../../lib/mongodb.js";
import Property from "../../../models/Property.js";

export async function GET() {
  try {
    await dbConnect();
    
    // Get 8 properties WITH price for homepage (featured)
    const properties = await Property.aggregate([
      {
        $match: {
          rentMin: { $gt: 0 }  // Only properties WITH price
        }
      },
      { $sort: { rentMin: -1, createdAt: -1 } },
      { $limit: 8 }
    ]);

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Failed", error: err.message }), { status: 500 });
  }
}