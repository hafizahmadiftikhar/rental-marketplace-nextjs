import mongoose from "mongoose";

// Location Schema
const LocationSchema = new mongoose.Schema({
  city: String,
  state: String,
  streetAddress: String,
  fullAddress: String,
  postalCode: Number,
  neighborhood: String,
});

// Contact Schema
const ContactSchema = new mongoose.Schema({
  phone: String,
});

// Model Images Schema
const ModelImageSchema = new mongoose.Schema({
  isSmall: { type: Boolean, default: false },
  isLarge: { type: Boolean, default: false },
  url: String,
});

// Model Details Schema
const ModelDetailsSchema = new mongoose.Schema({
  modelName: { type: String, required: true },
  availability: { type: String, default: "N/A" },
  rentLabel: { type: String, default: "Call for Rent" },
  images: [ModelImageSchema],
  details: [String],
});

// Main Property Schema
const PropertySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    propertyName: { type: String, required: true },
    description: String,
    neighborhoodDescription: String,
    subLocations: String,
    location: LocationSchema,
    beds: String, // Keep ranges as string, e.g., "1 - 2 bd"
    baths: String, // e.g., "1 ba"
    sqft: String, // e.g., "528 – 872 sq ft"
    isVerified: { type: Boolean, default: false },
    contact: ContactSchema,
    photos: [String], // property images
    models: [ModelDetailsSchema],
    rentMin: Number, // numeric min rent
    rentMax: Number, // numeric max rent
  },
  { timestamps: true }
);

export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);
