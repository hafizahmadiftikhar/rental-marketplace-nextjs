// app/api/rentalApplications/[id]/route.js
import dbConnect from "../../../../lib/mongodb.js";
import RentalApplication from "../../../../models/RentalApplication.js";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const application = await RentalApplication.findById(id);

    if (!application) {
      return new Response(JSON.stringify({ success: false, error: "Application not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data: application }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
