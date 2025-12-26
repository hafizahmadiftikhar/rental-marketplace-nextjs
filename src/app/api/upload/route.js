import dbConnect from "../../../lib/mongodb.js";
import Property from "../../../models/Property.js";
import { cleanPropertyData } from "../../../lib/cleanData.js";

export async function POST(req) {
  try {
    const text = await req.text();

    // Clean invalid JSON values
    const cleanedText = text
      .replace(/\bNaN\b/g, "null")
      .replace(/\bundefined\b/g, "null")
      .replace(/\bInfinity\b/g, "null");

    const data = JSON.parse(cleanedText);

    await dbConnect();

    // Fully clean each property
    const cleanedData = data.map(prop => cleanPropertyData(prop));

    // Optional: clear old data to avoid conflicts
    await Property.deleteMany({});

    // Insert all fresh
    await Property.insertMany(cleanedData);

    return new Response(JSON.stringify({ message: "Properties uploaded successfully!", count: cleanedData.length }), { status: 200 });
  } catch (err) {
    console.error("Upload failed:", err);
    return new Response(JSON.stringify({ message: "Upload failed", error: err.message }), { status: 500 });
  }
}
