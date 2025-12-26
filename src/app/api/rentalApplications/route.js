// app/api/rentalApplications/route.js
import dbConnect from "../../../lib/mongodb.js"; // your MongoDB connection helper
import RentalApplication from "../../../models/RentalApplication.js";

export async function GET(req) {
  try {
    await dbConnect();

    const applications = await RentalApplication.find().sort({ createdAt: -1 }); // latest first

    return new Response(JSON.stringify({ success: true, data: applications }), {
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
