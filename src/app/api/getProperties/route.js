import dbConnect from "../../../lib/mongodb.js";
import Property from "../../../models/Property.js";

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 50;
    const skip = (page - 1) * limit;

    const total = await Property.countDocuments();

    // Sort: Price wale FIRST, bina price wale LAST
    const properties = await Property.aggregate([
      {
        $addFields: {
          hasPrice: {
            $cond: {
              if: { $gt: ["$rentMin", 0] },
              then: 0,
              else: 1
            }
          }
        }
      },
      { $sort: { hasPrice: 1, rentMin: -1, createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      { $project: { hasPrice: 0 } }
    ]);

    return new Response(
      JSON.stringify({
        properties,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
      }), 
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: "Failed", error: err.message }), { status: 500 });
  }
}