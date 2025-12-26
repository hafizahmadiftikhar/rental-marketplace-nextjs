import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  url: { type: String, required: true },
  type: { type: String },
  uploadedAt: { type: Date, default: Date.now }
});

const EmploymentSchema = new mongoose.Schema({
  employer: { type: String },
  address: { type: String },
  cityStateZip: { type: String },
  phone: { type: String },
  supervisor: { type: String },
  position: { type: String },
  howLong: { type: String },
  salary: { type: String },
});

const RentalHistorySchema = new mongoose.Schema({
  presentAddress: { type: String },
  presentRentOrOwn: { type: String },
  presentAmountPaid: { type: String },
  presentReasonLeaving: { type: String },
  presentLandlordName: { type: String },
  presentLandlordPhone: { type: String },
  previousAddress: { type: String },
  previousRentOrOwn: { type: String },
  previousAmountPaid: { type: String },
  previousReasonLeaving: { type: String },
  previousLandlordName: { type: String },
  previousLandlordPhone: { type: String },
});

const BankingSchema = new mongoose.Schema({
  bankName: { type: String },
  bankPhone: { type: String },
  address: { type: String },
  accountNumber: { type: String },
  accountType: { type: String },
  balance: { type: String },
});

const PersonalReferenceSchema = new mongoose.Schema({
  name: String,
  address: String,
  cityStateZip: String,
  relationship: String,
  phone: String,
});

const SignatureSchema = new mongoose.Schema({
  dataURL: { type: String },
  signedAt: { type: Date },
});

const ApplicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ssn: { type: String },
  dlNumber: { type: String },
  dateOfBirth: { type: Date },
  phoneHome: { type: String },
  phoneWork: { type: String },
  email: { type: String },
  documents: [DocumentSchema],
  employment: EmploymentSchema,
  rentalHistory: RentalHistorySchema,
  banking: BankingSchema,
  personalReferences: [PersonalReferenceSchema],
  signature: SignatureSchema,
});

const OccupantSchema = new mongoose.Schema({
  name: String,
  age: String,
  relationship: String,
});

const VehicleSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: String,
  license: String,
});

const RentalApplicationSchema = new mongoose.Schema(
  {
    applicant1: { type: ApplicantSchema, required: true },
    applicant2: { type: ApplicantSchema },
    
    otherOccupants: [OccupantSchema],
    pets: { type: String },
    waterFurniture: { type: String },
    vehicles: [VehicleSchema],
    
    delinquentHistory: { type: String },
    evictionHistory: { type: String },
    applicationFee: { type: Number },
    
    // Removed duplicate signature fields - signatures are now only within each applicant
    pdfURL: { type: String } // Added to store the generated PDF URL
  },
  { timestamps: true }
);

export default mongoose.models.RentalApplication ||
  mongoose.model("RentalApplication", RentalApplicationSchema);