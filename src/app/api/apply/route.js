import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb.js";
import RentalApplication from "../../../models/RentalApplication.js";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    // Enhanced validation
    if (!data.applicant1 || !data.applicant1.name) {
      return NextResponse.json({ error: "Applicant 1 name is required" }, { status: 400 });
    }

    // Validate required fields for applicant1
    const requiredFields = ['name', 'email', 'phoneHome'];
    for (const field of requiredFields) {
      if (!data.applicant1[field]) {
        return NextResponse.json({ error: `Applicant 1 ${field} is required` }, { status: 400 });
      }
    }

    // Clean and structure the data
    const applicationData = {
      applicant1: cleanApplicantData(data.applicant1),
      applicant2: data.applicant2 ? cleanApplicantData(data.applicant2) : null,
      otherOccupants: data.otherOccupants || [],
      pets: data.pets || "",
      waterFurniture: data.waterFurniture || "",
      vehicles: data.vehicles || [],
      delinquentHistory: data.delinquentHistory || "",
      evictionHistory: data.evictionHistory || "",
      applicationFee: data.applicationFee ? Number(data.applicationFee) : null,
    };

    // Save application to MongoDB
    const created = await RentalApplication.create(applicationData);

    // Generate PDF
    const pdfBytes = await createApplicationPDF(created);

    // Upload PDF to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { 
          resource_type: "raw", 
          folder: "rental_applications", 
          public_id: `application_${created._id}`,
          format: 'pdf'
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(Buffer.from(pdfBytes));
    });

    // Save PDF URL to MongoDB
    created.pdfURL = uploadResult.secure_url;
    await created.save();

    // Return PDF as attachment for download
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="rental-application-${created._id}.pdf"`,
      },
    });
  } catch (err) {
    console.error("Apply route error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

// Helper function to clean applicant data
function cleanApplicantData(applicant) {
  return {
    ...applicant,
    personalReferences: applicant.personalReferences || [],
    documents: applicant.documents || [],
    employment: applicant.employment || {},
    rentalHistory: applicant.rentalHistory || {},
    banking: applicant.banking || {},
    signature: applicant.signature || { dataURL: null, signedAt: null }
  };
}

// Helper: generate a PDF with pdf-lib
async function createApplicationPDF(doc) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]); // A4 portrait
  const { width, height } = page.getSize();
  const margin = 40;
  let y = height - margin;

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontSizeTitle = 14;
  const fontSize = 10;
  const lineHeight = 14;

  const drawLine = (text, options = {}) => {
    if (y < margin + 20) {
      page = pdfDoc.addPage([595, 842]);
      y = page.getHeight() - margin;
    }
    page.drawText(text, { 
      x: margin + (options.indent || 0), 
      y, 
      size: options.size || fontSize, 
      font: options.font || font, 
      color: options.color || rgb(0, 0, 0) 
    });
    y -= lineHeight;
  };

  // Title
  page.drawText("RENTAL APPLICATION", { 
    x: margin, 
    y, 
    size: 18, 
    font: fontBold, 
    color: rgb(0, 0, 0) 
  });
  y -= 30;

  const drawApplicant = (app, label) => {
    if (!app) return;
    
    drawLine(label, { size: fontSizeTitle, font: fontBold });
    const lines = [
      `Name: ${app.name || "Not provided"}`,
      `SSN: ${app.ssn || "Not provided"}`,
      `DL#: ${app.dlNumber || "Not provided"}`,
      `DOB: ${app.dateOfBirth ? new Date(app.dateOfBirth).toLocaleDateString() : "Not provided"}`,
      `Home Phone: ${app.phoneHome || "Not provided"}`,
      `Work Phone: ${app.phoneWork || "Not provided"}`,
      `Email: ${app.email || "Not provided"}`,
      `Employment: ${app.employment?.employer || "Not provided"} - ${app.employment?.position || ""}`,
      `Salary: ${app.employment?.salary || "Not provided"}`,
      `Present Address: ${app.rentalHistory?.presentAddress || "Not provided"}`,
      `Present Rent: $${app.rentalHistory?.presentAmountPaid || "Not provided"}`,
    ];
    lines.forEach(line => drawLine(line));
    
    // Personal References
    if (app.personalReferences?.length > 0) {
      y -= 6;
      drawLine("Personal References:", { size: fontSizeTitle, font: fontBold });
      app.personalReferences.forEach((ref, index) => {
        drawLine(`${index + 1}. ${ref.name || ""} - ${ref.relationship || ""} - ${ref.phone || ""}`, { indent: 8 });
      });
    }
    
    y -= 10;
  };

  // Draw applicants
  drawApplicant(doc.applicant1, "APPLICANT 1");
  drawApplicant(doc.applicant2, "APPLICANT 2");

  // Other occupants
  if (doc.otherOccupants?.length > 0) {
    drawLine("OTHER OCCUPANTS:", { size: fontSizeTitle, font: fontBold });
    doc.otherOccupants.forEach((oc, index) => 
      drawLine(`${index + 1}. ${oc.name || ""} — Age: ${oc.age || ""} — ${oc.relationship || ""}`, { indent: 8 })
    );
    y -= 10;
  }

  // Vehicles
  if (doc.vehicles?.length > 0) {
    drawLine("VEHICLES:", { size: fontSizeTitle, font: fontBold });
    doc.vehicles.forEach((v, index) => 
      drawLine(`${index + 1}. ${v.year || ""} ${v.make || ""} ${v.model || ""} — License: ${v.license || ""}`, { indent: 8 })
    );
    y -= 10;
  }

  // Additional Information
  const additionalInfo = [
    `Pets: ${doc.pets || "None"}`,
    `Water Furniture: ${doc.waterFurniture || "None"}`,
    `Delinquent History: ${doc.delinquentHistory || "None"}`,
    `Eviction History: ${doc.evictionHistory || "None"}`,
    `Application Fee: $${doc.applicationFee || "0"}`,
  ];
  
  drawLine("ADDITIONAL INFORMATION:", { size: fontSizeTitle, font: fontBold });
  additionalInfo.forEach(info => drawLine(info, { indent: 8 }));
  y -= 20;

  // Signatures
  const drawSignature = async (sigData, label) => {
    if (sigData?.dataURL) {
      try {
        const sigBase64 = sigData.dataURL.split(",")[1];
        const sigBytes = Buffer.from(sigBase64, "base64");
        const sigImage = await pdfDoc.embedPng(sigBytes);
        
        drawLine(`${label}:`, { font: fontBold });
        page.drawImage(sigImage, { 
          x: margin + 150, 
          y: y - 30, 
          width: 120, 
          height: 40 
        });
        y -= 60;
      } catch (e) {
        console.warn(`Signature embed error for ${label}:`, e);
        drawLine(`${label}: [Signature image failed to load]`, { font: fontBold });
        y -= 20;
      }
    }
  };

  await drawSignature(doc.applicant1?.signature, "Applicant 1 Signature");
  if (doc.applicant2) {
    await drawSignature(doc.applicant2?.signature, "Applicant 2 Signature");
  }

  // Footer
  const createdAt = new Date(doc.createdAt || Date.now()).toLocaleString();
  drawLine(`Application ID: ${doc._id}`, { size: 9 });
  page.drawText(`Submitted: ${createdAt}`, { 
    x: margin + 300, 
    y: 40, 
    size: 9, 
    font, 
    color: rgb(0, 0, 0) 
  });

  return await pdfDoc.save();
}