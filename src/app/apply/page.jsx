"use client";
import { useState } from "react";
import SignaturePadComponent from "../../components/s/SignaturePad";
import UploadField from "../../components/s/UploadField";
import { 
  FaUser, 
  FaBriefcase, 
  FaHome, 
  FaUniversity, 
  FaUsers, 
  FaCar, 
  FaPaw, 
  FaFileSignature,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaCalendar,
  FaUserTie,
  FaPlus,
  FaTrash,
  FaExclamationCircle
} from "react-icons/fa";

export default function RentalApplicationForm() {
  const [form, setForm] = useState({
    applicant1: emptyApplicant(),
    applicant2: emptyApplicant(),
    includeApplicant2: false,
    otherOccupants: [],
    vehicles: [],
    pets: "",
    waterFurniture: "",
    delinquentHistory: "",
    evictionHistory: "",
    applicationFee: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [errors, setErrors] = useState({});

  function emptyApplicant() {
    return {
      name: "",
      ssn: "",
      dlNumber: "",
      dateOfBirth: "",
      phoneHome: "",
      phoneWork: "",
      email: "",
      documents: [],
      employment: {
        employer: "",
        address: "",
        cityStateZip: "",
        phone: "",
        supervisor: "",
        position: "",
        howLong: "",
        salary: "",
      },
      rentalHistory: {
        presentAddress: "",
        presentRentOrOwn: "",
        presentAmountPaid: "",
        presentReasonLeaving: "",
        presentLandlordName: "",
        presentLandlordPhone: "",
        previousAddress: "",
        previousRentOrOwn: "",
        previousAmountPaid: "",
        previousReasonLeaving: "",
        previousLandlordName: "",
        previousLandlordPhone: "",
      },
      banking: {
        bankName: "",
        bankPhone: "",
        address: "",
        accountNumber: "",
        accountType: "",
        balance: "",
      },
      personalReferences: [],
      signature: { dataURL: null, signedAt: null },
    };
  }

  function setApplicantField(applicant, field, value) {
    setForm((prev) => ({
      ...prev,
      [applicant]: { ...prev[applicant], [field]: value },
    }));
    // Clear error when field is updated
    if (errors[`${applicant}.${field}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`${applicant}.${field}`];
        return newErrors;
      });
    }
  }

  function setApplicantNested(applicant, section, field, value) {
    setForm((prev) => ({
      ...prev,
      [applicant]: {
        ...prev[applicant],
        [section]: { ...prev[applicant][section], [field]: value },
      },
    }));
  }

  function addReference(applicant) {
    setForm((prev) => ({
      ...prev,
      [applicant]: {
        ...prev[applicant],
        personalReferences: [
          ...prev[applicant].personalReferences,
          { name: "", address: "", cityStateZip: "", relationship: "", phone: "" },
        ],
      },
    }));
  }

  function removeReference(applicant, index) {
    setForm((prev) => ({
      ...prev,
      [applicant]: {
        ...prev[applicant],
        personalReferences: prev[applicant].personalReferences.filter((_, i) => i !== index),
      },
    }));
  }

  function updateReference(applicant, index, field, value) {
    const refs = [...form[applicant].personalReferences];
    refs[index][field] = value;
    setApplicantField(applicant, "personalReferences", refs);
  }

  function addOccupant() {
    setForm((prev) => ({
      ...prev,
      otherOccupants: [...prev.otherOccupants, { name: "", age: "", relationship: "" }],
    }));
  }

  function removeOccupant(index) {
    setForm((prev) => ({
      ...prev,
      otherOccupants: prev.otherOccupants.filter((_, i) => i !== index),
    }));
  }

  function updateOccupant(index, field, value) {
    const updated = [...form.otherOccupants];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, otherOccupants: updated }));
  }

  function addVehicle() {
    setForm((prev) => ({
      ...prev,
      vehicles: [...prev.vehicles, { make: "", model: "", year: "", license: "" }],
    }));
  }

  function removeVehicle(index) {
    setForm((prev) => ({
      ...prev,
      vehicles: prev.vehicles.filter((_, i) => i !== index),
    }));
  }

  function updateVehicle(index, field, value) {
    const updated = [...form.vehicles];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, vehicles: updated }));
  }

  // Validate critical fields
  function validateForm() {
    const newErrors = {};

    // Applicant 1 - Critical Fields (NON-SKIPPABLE)
    if (!form.applicant1.name.trim()) {
      newErrors["applicant1.name"] = "Full Name is required";
    }
    if (!form.applicant1.ssn.trim()) {
      newErrors["applicant1.ssn"] = "Social Security Number is required";
    }
    if (!form.applicant1.dlNumber.trim()) {
      newErrors["applicant1.dlNumber"] = "Driver's License Number is required";
    }
    if (!form.applicant1.dateOfBirth) {
      newErrors["applicant1.dateOfBirth"] = "Date of Birth is required";
    }
    if (!form.applicant1.phoneHome.trim()) {
      newErrors["applicant1.phoneHome"] = "Home Phone is required";
    }
    
    // Documents validation - Min 2, Max 20
    if (form.applicant1.documents.length < 2) {
      newErrors["applicant1.documents"] = "Please upload at least 2 documents (ID, proof of income, etc.)";
    }
    if (form.applicant1.documents.length > 20) {
      newErrors["applicant1.documents"] = "Maximum 20 documents allowed";
    }

    // Applicant 2 - If included (same critical fields)
    if (form.includeApplicant2) {
      if (!form.applicant2.name.trim()) {
        newErrors["applicant2.name"] = "Full Name is required";
      }
      if (!form.applicant2.ssn.trim()) {
        newErrors["applicant2.ssn"] = "Social Security Number is required";
      }
      if (!form.applicant2.dlNumber.trim()) {
        newErrors["applicant2.dlNumber"] = "Driver's License Number is required";
      }
      if (!form.applicant2.dateOfBirth) {
        newErrors["applicant2.dateOfBirth"] = "Date of Birth is required";
      }
      if (!form.applicant2.phoneHome.trim()) {
        newErrors["applicant2.phoneHome"] = "Home Phone is required";
      }
      
      // Documents validation for Applicant 2
      if (form.applicant2.documents.length < 2) {
        newErrors["applicant2.documents"] = "Please upload at least 2 documents (ID, proof of income, etc.)";
      }
      if (form.applicant2.documents.length > 20) {
        newErrors["applicant2.documents"] = "Maximum 20 documents allowed";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validate before submit
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = document.querySelector('.error-field');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      alert("Please fill in all required fields and upload at least 2 documents.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        applicant1: form.applicant1,
        applicant2: form.includeApplicant2 ? form.applicant2 : null,
        otherOccupants: form.otherOccupants,
        vehicles: form.vehicles,
        pets: form.pets,
        waterFurniture: form.waterFurniture,
        delinquentHistory: form.delinquentHistory,
        evictionHistory: form.evictionHistory,
        applicationFee: form.applicationFee,
      };

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Error: " + err.error);
      } else {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "rental-application.pdf";
        a.click();
      }
    } catch (e) {
      console.log(e);
      alert("Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#2F5233] via-[#507144] to-[#658C58] text-white">
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Rental Application</h1>
          <p className="text-white/80 text-sm md:text-base">Complete all sections below to submit your application</p>
        </div>
      </div>

      {/* Instructions Card */}
      <div className="max-w-5xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#658C58] to-[#507144] px-6 py-4">
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              <FaCheckCircle /> Application Process
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: "1", title: "Complete Form", desc: "Fill all required fields" },
                { step: "2", title: "Upload Documents", desc: "Min 2 / Max 20 files" },
                { step: "3", title: "Sign & Submit", desc: "Electronic signature" },
                { step: "4", title: "Get Approved", desc: "24-48 hour review" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#658C58] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 text-sm">
                <span className="font-bold">⚠️ Important:</span> The $60 application fee is non-refundable. Please upload a photo of your money order or certified check.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Applicant 1 */}
          <FormCard 
            icon={<FaUser />} 
            title="Primary Applicant" 
            subtitle="Personal information for the main applicant"
            showHelp={true}
          >
            <ApplicantForm
              applicant="applicant1"
              form={form}
              errors={errors}
              setApplicantField={setApplicantField}
              setApplicantNested={setApplicantNested}
              addReference={addReference}
              removeReference={removeReference}
              updateReference={updateReference}
            />
          </FormCard>

          {/* Applicant 2 Toggle */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.includeApplicant2}
                onChange={(e) => setForm((prev) => ({ ...prev, includeApplicant2: e.target.checked }))}
                className="w-5 h-5 text-[#658C58] border-gray-300 rounded focus:ring-[#658C58]"
              />
              <div>
                <span className="font-semibold text-gray-800">Add Second Applicant</span>
                <p className="text-gray-500 text-sm">Check this box if there is a co-applicant</p>
              </div>
            </label>
          </div>

          {/* Applicant 2 */}
          {form.includeApplicant2 && (
            <FormCard 
              icon={<FaUserTie />} 
              title="Second Applicant" 
              subtitle="Personal information for the co-applicant"
            >
              <ApplicantForm
                applicant="applicant2"
                form={form}
                errors={errors}
                setApplicantField={setApplicantField}
                setApplicantNested={setApplicantNested}
                addReference={addReference}
                removeReference={removeReference}
                updateReference={updateReference}
              />
            </FormCard>
          )}

          {/* Other Occupants */}
          <FormCard 
            icon={<FaUsers />} 
            title="Other Occupants" 
            subtitle="List all other people who will live in the property"
          >
            {form.otherOccupants.length === 0 ? (
              <p className="text-gray-500 text-sm mb-4">No other occupants added yet.</p>
            ) : (
              <div className="space-y-4 mb-4">
                {form.otherOccupants.map((o, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 relative">
                    <button
                      type="button"
                      onClick={() => removeOccupant(i)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                    >
                      <FaTrash size={14} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InputField label="Full Name" value={o.name} onChange={(e) => updateOccupant(i, "name", e.target.value)} />
                      <InputField label="Age" value={o.age} onChange={(e) => updateOccupant(i, "age", e.target.value)} />
                      <InputField label="Relationship" value={o.relationship} onChange={(e) => updateOccupant(i, "relationship", e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <AddButton onClick={addOccupant} label="Add Occupant" />
          </FormCard>

          {/* Vehicles */}
          <FormCard 
            icon={<FaCar />} 
            title="Vehicles" 
            subtitle="List all vehicles that will be parked at the property"
          >
            {form.vehicles.length === 0 ? (
              <p className="text-gray-500 text-sm mb-4">No vehicles added yet.</p>
            ) : (
              <div className="space-y-4 mb-4">
                {form.vehicles.map((v, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 relative">
                    <button
                      type="button"
                      onClick={() => removeVehicle(i)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                    >
                      <FaTrash size={14} />
                    </button>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <InputField label="Make" value={v.make} onChange={(e) => updateVehicle(i, "make", e.target.value)} />
                      <InputField label="Model" value={v.model} onChange={(e) => updateVehicle(i, "model", e.target.value)} />
                      <InputField label="Year" value={v.year} onChange={(e) => updateVehicle(i, "year", e.target.value)} />
                      <InputField label="License Plate" value={v.license} onChange={(e) => updateVehicle(i, "license", e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <AddButton onClick={addVehicle} label="Add Vehicle" />
          </FormCard>

          {/* Additional Information */}
          <FormCard 
            icon={<FaPaw />} 
            title="Additional Information" 
            subtitle="Pets, history, and other details"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextAreaField 
                label="Pets" 
                placeholder="Describe any pets (type, breed, weight)"
                value={form.pets}
                onChange={(e) => setForm((prev) => ({ ...prev, pets: e.target.value }))}
              />
              <TextAreaField 
                label="Water Furniture" 
                placeholder="Waterbeds, aquariums, etc."
                value={form.waterFurniture}
                onChange={(e) => setForm((prev) => ({ ...prev, waterFurniture: e.target.value }))}
              />
              <TextAreaField 
                label="Delinquent Payment History" 
                placeholder="Any late payments or collections"
                value={form.delinquentHistory}
                onChange={(e) => setForm((prev) => ({ ...prev, delinquentHistory: e.target.value }))}
              />
              <TextAreaField 
                label="Eviction History" 
                placeholder="Any prior evictions"
                value={form.evictionHistory}
                onChange={(e) => setForm((prev) => ({ ...prev, evictionHistory: e.target.value }))}
              />
            </div>
            <div className="mt-6">
              <InputField 
                label="Application Fee Amount" 
                type="number"
                placeholder="60"
                value={form.applicationFee}
                onChange={(e) => setForm((prev) => ({ ...prev, applicationFee: e.target.value }))}
              />
            </div>
          </FormCard>

          {/* Terms & Submit */}
          <FormCard 
            icon={<FaFileSignature />} 
            title="Authorization & Submission" 
            subtitle="Review terms and submit your application"
          >
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-gray-700 text-sm leading-relaxed">
                By signing below, I certify that all information provided in this application is true and complete. 
                I authorize <span className="font-bold">RivoRent Inc.</span> to verify the above information and obtain 
                consumer credit reports, criminal background reports, and eviction records.
              </p>
              <p className="text-gray-700 text-sm mt-3">
                I understand that the <span className="font-bold text-[#658C58]">$60 application fee</span> is 
                non-refundable and will not be applied toward rent.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type Your Full Legal Name as Electronic Signature <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Type your full legal name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#658C58] bg-white text-gray-800 italic"
                required
              />
              <p className="text-gray-500 text-xs mt-1">Date: {new Date().toLocaleDateString()}</p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-[#2F5233] to-[#658C58] text-white py-4 rounded-xl font-bold text-lg hover:from-[#507144] hover:to-[#658C58] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FaCheckCircle /> Submit Application
                </>
              )}
            </button>
          </FormCard>

          {/* Contact Footer */}
          <div className="text-center py-6">
            <p className="text-gray-500 text-sm">
              Need help? Contact us at{" "}
              <a
                href="tel:+18455769038"
                className="font-bold text-[#658C58]"
              >
                (845) 576-9038
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function FormCard({ icon, title, subtitle, showHelp, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#658C58] text-white rounded-xl flex items-center justify-center">
              {icon}
            </div>
            <div>
              <h2 className="font-bold text-gray-800">{title}</h2>
              <p className="text-gray-500 text-sm">{subtitle}</p>
            </div>
          </div>
          {showHelp && (
            <a 
              href="tel:+18455769038" 
              className="flex items-center gap-2 px-4 py-2 bg-[#658C58]/10 hover:bg-[#658C58]/20 rounded-lg transition-colors"
            >
              <FaPhone className="text-[#658C58] text-sm" />
              <span className="text-sm">
                <span className="text-gray-600">Need Help?</span>{" "}
                <span className="font-semibold text-[#658C58]">(845) 576-9038</span>
              </span>
            </a>
          )}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function InputField({ label, required, error, ...props }) {
  return (
    <div className={error ? "error-field" : ""}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#658C58]/20 focus:border-[#658C58] bg-white text-gray-800 text-sm transition-all ${
          error ? "border-red-500 bg-red-50" : "border-gray-200"
        }`}
        required={required}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <FaExclamationCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

function TextAreaField({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#658C58]/20 focus:border-[#658C58] bg-white text-gray-800 text-sm resize-none transition-all"
        rows={3}
        {...props}
      />
    </div>
  );
}

function AddButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-[#658C58]/10 text-[#658C58] rounded-lg hover:bg-[#658C58]/20 transition-all font-medium text-sm"
    >
      <FaPlus size={12} /> {label}
    </button>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
      <span className="text-[#658C58]">{icon}</span>
      <h3 className="font-semibold text-gray-800">{title}</h3>
    </div>
  );
}

/* ================= APPLICANT FORM ================= */
function ApplicantForm({
  applicant,
  form,
  errors,
  setApplicantField,
  setApplicantNested,
  addReference,
  removeReference,
  updateReference,
}) {
  const ap = form[applicant];
  
  // Check if max documents reached
  const maxDocsReached = ap.documents.length >= 20;

  // Remove document
  const removeDocument = (index) => {
    const updatedDocs = ap.documents.filter((_, i) => i !== index);
    setApplicantField(applicant, "documents", updatedDocs);
  };

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div>
        <SectionTitle icon={<FaIdCard />} title="Personal Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField 
            label="Full Name" 
            required 
            placeholder="John Doe" 
            value={ap.name} 
            onChange={(e) => setApplicantField(applicant, "name", e.target.value)} 
            error={errors[`${applicant}.name`]}
          />
          <InputField 
            label="Social Security Number" 
            required 
            placeholder="XXX-XX-XXXX" 
            value={ap.ssn} 
            onChange={(e) => setApplicantField(applicant, "ssn", e.target.value)} 
            error={errors[`${applicant}.ssn`]}
          />
          <InputField 
            label="Driver's License Number" 
            required 
            placeholder="DL123456" 
            value={ap.dlNumber} 
            onChange={(e) => setApplicantField(applicant, "dlNumber", e.target.value)} 
            error={errors[`${applicant}.dlNumber`]}
          />
          <InputField 
            label="Date of Birth" 
            required 
            type="date" 
            value={ap.dateOfBirth} 
            onChange={(e) => setApplicantField(applicant, "dateOfBirth", e.target.value)} 
            error={errors[`${applicant}.dateOfBirth`]}
          />
          <InputField 
            label="Home Phone" 
            required 
            placeholder="(555) 123-4567" 
            value={ap.phoneHome} 
            onChange={(e) => setApplicantField(applicant, "phoneHome", e.target.value)} 
            error={errors[`${applicant}.phoneHome`]}
          />
          <InputField 
            label="Work Phone" 
            placeholder="(555) 987-6543" 
            value={ap.phoneWork} 
            onChange={(e) => setApplicantField(applicant, "phoneWork", e.target.value)} 
          />
          <div className="md:col-span-2">
            <InputField 
              label="Email Address" 
              required 
              type="email" 
              placeholder="john@example.com" 
              value={ap.email} 
              onChange={(e) => setApplicantField(applicant, "email", e.target.value)} 
            />
          </div>
        </div>
      </div>

      {/* Employment */}
      <div>
        <SectionTitle icon={<FaBriefcase />} title="Employment Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Employer" required value={ap.employment.employer} onChange={(e) => setApplicantNested(applicant, "employment", "employer", e.target.value)} />
          <InputField label="Position" required value={ap.employment.position} onChange={(e) => setApplicantNested(applicant, "employment", "position", e.target.value)} />
          <InputField label="Employer Address" value={ap.employment.address} onChange={(e) => setApplicantNested(applicant, "employment", "address", e.target.value)} />
          <InputField label="City/State/Zip" value={ap.employment.cityStateZip} onChange={(e) => setApplicantNested(applicant, "employment", "cityStateZip", e.target.value)} />
          <InputField label="Employer Phone" value={ap.employment.phone} onChange={(e) => setApplicantNested(applicant, "employment", "phone", e.target.value)} />
          <InputField label="Supervisor Name" value={ap.employment.supervisor} onChange={(e) => setApplicantNested(applicant, "employment", "supervisor", e.target.value)} />
          <InputField label="How Long Employed" required value={ap.employment.howLong} onChange={(e) => setApplicantNested(applicant, "employment", "howLong", e.target.value)} />
          <InputField label="Monthly Salary" required placeholder="$0.00" value={ap.employment.salary} onChange={(e) => setApplicantNested(applicant, "employment", "salary", e.target.value)} />
        </div>
      </div>

      {/* Rental History */}
      <div>
        <SectionTitle icon={<FaHome />} title="Rental History" />
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-[#658C58] mb-3">Current/Present Address</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <InputField label="Address" required value={ap.rentalHistory.presentAddress} onChange={(e) => setApplicantNested(applicant, "rentalHistory", "presentAddress", e.target.value)} />
              </div>
              <InputField label="Rent or Own" required value={ap.rentalHistory.presentRentOrOwn} onChange={(e) => setApplicantNested(applicant, "rentalHistory", "presentRentOrOwn", e.target.value)} />
              <InputField label="Amount Paid Monthly" required placeholder="$0.00" value={ap.rentalHistory.presentAmountPaid} onChange={(e) => setApplicantNested(applicant, "rentalHistory", "presentAmountPaid", e.target.value)} />
              <InputField label="Reason for Leaving" required value={ap.rentalHistory.presentReasonLeaving} onChange={(e) => setApplicantNested(applicant, "rentalHistory", "presentReasonLeaving", e.target.value)} />
              <InputField label="Landlord Name" value={ap.rentalHistory.presentLandlordName} onChange={(e) => setApplicantNested(applicant, "rentalHistory", "presentLandlordName", e.target.value)} />
              <InputField label="Landlord Phone" value={ap.rentalHistory.presentLandlordPhone} onChange={(e) => setApplicantNested(applicant, "rentalHistory", "presentLandlordPhone", e.target.value)} />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-3">Previous Address (Optional)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Address" value={ap.rentalHistory.previousAddress} onChange={(e) => setApplicantNested(applicant, "rentalHistory", "previousAddress", e.target.value)} />
              <InputField label="Rent or Own" value={ap.rentalHistory.previousRentOrOwn} onChange={(e) => setApplicantNested(applicant, "rentalHistory", "previousRentOrOwn", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* Banking */}
      <div>
        <SectionTitle icon={<FaUniversity />} title="Banking Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Bank Name" required value={ap.banking.bankName} onChange={(e) => setApplicantNested(applicant, "banking", "bankName", e.target.value)} />
          <InputField label="Bank Phone" value={ap.banking.bankPhone} onChange={(e) => setApplicantNested(applicant, "banking", "bankPhone", e.target.value)} />
          <InputField label="Bank Address" value={ap.banking.address} onChange={(e) => setApplicantNested(applicant, "banking", "address", e.target.value)} />
          <InputField label="Account Number" required value={ap.banking.accountNumber} onChange={(e) => setApplicantNested(applicant, "banking", "accountNumber", e.target.value)} />
          <InputField label="Account Type" required placeholder="Checking / Savings" value={ap.banking.accountType} onChange={(e) => setApplicantNested(applicant, "banking", "accountType", e.target.value)} />
          <InputField label="Approximate Balance" required placeholder="$0.00" value={ap.banking.balance} onChange={(e) => setApplicantNested(applicant, "banking", "balance", e.target.value)} />
        </div>
      </div>

      {/* Personal References */}
      <div>
        <SectionTitle icon={<FaUsers />} title="Personal References" />
        {ap.personalReferences.length === 0 ? (
          <p className="text-gray-500 text-sm mb-4">No references added yet. Add at least one reference.</p>
        ) : (
          <div className="space-y-4 mb-4">
            {ap.personalReferences.map((ref, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 relative">
                <button
                  type="button"
                  onClick={() => removeReference(applicant, i)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                >
                  <FaTrash size={14} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Name" value={ref.name} onChange={(e) => updateReference(applicant, i, "name", e.target.value)} />
                  <InputField label="Phone" value={ref.phone} onChange={(e) => updateReference(applicant, i, "phone", e.target.value)} />
                  <InputField label="Relationship" value={ref.relationship} onChange={(e) => updateReference(applicant, i, "relationship", e.target.value)} />
                  <InputField label="City/State/Zip" value={ref.cityStateZip} onChange={(e) => updateReference(applicant, i, "cityStateZip", e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        )}
        <AddButton onClick={() => addReference(applicant)} label="Add Reference" />
      </div>

      {/* Document Upload - REQUIRED: Min 2, Max 20 */}
      <div className={errors[`${applicant}.documents`] ? "error-field" : ""}>
        <SectionTitle icon={<FaFileSignature />} title="Upload Documents" />
        
        {/* Requirements Notice */}
        <div className={`p-4 rounded-lg mb-4 ${
          ap.documents.length < 2 
            ? "bg-red-50 border border-red-200" 
            : ap.documents.length >= 20 
              ? "bg-amber-50 border border-amber-200"
              : "bg-green-50 border border-green-200"
        }`}>
          <p className={`text-sm font-medium ${
            ap.documents.length < 2 
              ? "text-red-700" 
              : ap.documents.length >= 20 
                ? "text-amber-700"
                : "text-green-700"
          }`}>
            <span className="font-bold">Required:</span> Upload between 2 and 20 documents
            <span className="ml-2">({ap.documents.length}/20 uploaded)</span>
          </p>
        </div>

        {/* Application Fee Payment Notice */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
          <p className="text-blue-800 font-semibold text-sm mb-1">Application Fee Payment</p>
          <p className="text-blue-700 text-sm">
            To ensure secure processing, the <span className="font-bold">$60 application fee</span> must be submitted via money order or certified check. Please upload clear photos of <span className="font-bold">both sides</span> of the payment.
          </p>
        </div>

        {errors[`${applicant}.documents`] && (
          <p className="text-red-500 text-sm mb-3 flex items-center gap-1">
            <FaExclamationCircle /> {errors[`${applicant}.documents`]}
          </p>
        )}

        {/* Upload Field - Disabled if max reached */}
        {!maxDocsReached ? (
          <UploadField
            onUpload={(fileObj) => {
              if (ap.documents.length < 20) {
                setApplicantField(applicant, "documents", [...ap.documents, fileObj]);
              }
            }}
          />
        ) : (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm">
            Maximum 20 documents reached. Remove a document to upload more.
          </div>
        )}

        {/* Uploaded Documents List */}
        {ap.documents.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Documents:</p>
            <div className="space-y-2">
              {ap.documents.map((doc, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between px-4 py-2 bg-green-50 border border-green-200 rounded-lg"
                >
                  <span className="text-green-700 text-sm flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    Document {i + 1}: {doc.name || `File ${i + 1}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeDocument(i)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remove document"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Signature */}
      <div>
        <SectionTitle icon={<FaFileSignature />} title="Applicant Signature" />
        <p className="text-gray-500 text-sm mb-4">Please sign in the box below using your mouse or touch screen</p>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50">
          <SignaturePadComponent
            onEnd={(base64) => {
              setApplicantField(applicant, "signature", {
                dataURL: base64,
                signedAt: base64 ? new Date().toISOString() : null,
              });
            }}
          />
        </div>
        {ap.signature.dataURL && (
          <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
            <FaCheckCircle /> Signature captured successfully
          </p>
        )}
      </div>
    </div>
  );
}