import dbConnect from "../../../lib/mongodb.js";
import Property from "../../../models/Property.js";

export async function GET() {
  try {
    await dbConnect();
    const properties = await Property.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Failed to fetch propertiessss",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}
