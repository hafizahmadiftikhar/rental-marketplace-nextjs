import dbConnect from "../../../../lib/mongodb.js";
import Property from "../../../../models/Property.js";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    
    const property = await Property.findById(id);
    
    if (!property) {
      return new Response(
        JSON.stringify({ error: "Property not found" }), 
        { status: 404 }
      );
    }
    
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }), 
      { status: 500 }
    );
  }
}