"use client";
import { useState } from "react";
import SignaturePadComponent from "../../components/s/SignaturePad";
import UploadField from "../../components/s/UploadField";

export default function RentalApplicationForm() {
  const [form, setForm] = useState({
    applicant1: emptyApplicant(),
    applicant2: emptyApplicant(),
    includeApplicant2: false,

    otherOccupants: [],
    vehicles: [],
    personalReferences1: [],
    personalReferences2: [],

    pets: "",
    waterFurniture: "",
    delinquentHistory: "",
    evictionHistory: "",
    applicationFee: "",
  });

  const [submitting, setSubmitting] = useState(false);

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
      [applicant]: {
        ...prev[applicant],
        [field]: value,
      },
    }));
  }

  function setApplicantNested(applicant, section, field, value) {
    setForm((prev) => ({
      ...prev,
      [applicant]: {
        ...prev[applicant],
        [section]: {
          ...prev[applicant][section],
          [field]: value,
        },
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
          {
            name: "",
            address: "",
            cityStateZip: "",
            relationship: "",
            phone: "",
          },
        ],
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
      otherOccupants: [
        ...prev.otherOccupants,
        { name: "", age: "", relationship: "" },
      ],
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
      vehicles: [
        ...prev.vehicles,
        { make: "", model: "", year: "", license: "" },
      ],
    }));
  }

  function updateVehicle(index, field, value) {
    const updated = [...form.vehicles];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, vehicles: updated }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
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
  // Add this component inside your RentalApplicationForm function, before the return statement
  const InstructionCard = () => (
    <div className="mb-2 bg-gradient-to-br from-[#658C58] to-[#507144] text-white rounded-lg shadow-2xl border border-[#3a6b4a] overflow-hidden transform transition-all duration-300">
      {/* Header with Icon */}
      <div className="bg-[#2F5233] px-6 py-4 border-b border-[#658C58]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">
            Application Process Guide
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Step 1 */}
        <div className="flex items-start gap-4 group">
          <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <span className="text-sm font-bold text-white">1</span>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">
              ⁠Complete & Submit Your Application
            </h4>
            <p className="text-white/90 text-sm leading-relaxed">
              Fill out all required fields accurately and click Submit.
              <br />
              You will receive a confirmation email immediately.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-4 group">
          <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <span className="text-sm font-bold text-white">2</span>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">
              Application Fee & Required Documents
            </h4>
            <p className="text-white/90 text-sm leading-relaxed">
              Submit the <span className="font-bold">$60</span> application fee
              by money order or certified check payable to RivoRent Inc.
              <br />
              <span className="font-bold"> RivoRent Inc.</span>. This fee covers
              background and credit verification.
              <br />
              <span className="font-bold text-red-700 ">
                Upload clear front and back images of your money order or
                certified check in the Documents Upload section. Applications
                cannot be processed without a valid payment upload.
              </span>
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-4 group">
          <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <span className="text-sm font-bold text-white">3</span>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">
              Verification Process
            </h4>
            <p className="text-white/90 text-sm leading-relaxed">
              Our team will review your information, verify documents, and
              complete all background and credit checks within 24–48 hours.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex items-start gap-4 group">
          <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <span className="text-sm font-bold text-white">4</span>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Final Decision</h4>
            <p className="text-white/90 text-sm leading-relaxed">
              You will receive a notification regarding your application status.
              Approved applicants will be contacted to proceed with lease
              signing.
            </p>
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-6 p-4 bg-white/10 rounded-lg border-l-4 border-yellow-400">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-white font-semibold text-sm mb-1">
                Important Note
              </p>
              <p className="text-white/90 text-sm">
                The{" "}
                <span className="font-bold">
                  $60 application fee is non-refundable
                </span>{" "}
                and does not apply toward your rent. All application approvals
                are subject to successful verification.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#2F5233] px-6 py-3 border-t border-[#658C58]">
        <p className="text-white/80 text-sm text-center font-medium">
          Need help? Contact us at{" "}
          <span className="text-white font-bold">+845-576-9038</span>
        </p>
      </div>
    </div>
  );
  return (
    <>
      <div className="flex justify-center items-start py-10 bg-gray-100 ">
        <InstructionCard />
      </div>
      <div className="flex justify-center items-start  bg-gray-100 min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-white shadow-2xl rounded-sm p-8 border border-gray-300"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9))",
            backgroundSize: "100% 100%",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8 border-b-2 border-gray-800 pb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              RENTAL APPLICATION FORM
            </h1>
            <p className="text-sm text-gray-600 uppercase tracking-wide">
              Confidential Application Document - For Internal Use Only
            </p>
          </div>

          {/* ================= APPLICANT 1 ================= */}
          <Section title="APPLICANT 1: PERSONAL INFORMATION">
            <ApplicantForm
              applicant="applicant1"
              form={form}
              setApplicantField={setApplicantField}
              setApplicantNested={setApplicantNested}
              addReference={addReference}
              updateReference={updateReference}
            />
          </Section>

          {/* ================= APPLICANT 2 TOGGLE ================= */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="includeApplicant2"
                checked={form.includeApplicant2}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    includeApplicant2: e.target.checked,
                  }))
                }
                className="mr-3 w-4 h-4"
              />
              <label
                htmlFor="includeApplicant2"
                className="text-sm font-semibold text-gray-700"
              >
                Include Second Applicant
              </label>
            </div>
          </div>

          {/* ================= APPLICANT 2 ================= */}
          {form.includeApplicant2 && (
            <Section title="APPLICANT 2: PERSONAL INFORMATION">
              <ApplicantForm
                applicant="applicant2"
                form={form}
                setApplicantField={setApplicantField}
                setApplicantNested={setApplicantNested}
                addReference={addReference}
                updateReference={updateReference}
              />
            </Section>
          )}

          {/* ================= OTHER OCCUPANTS ================= */}
          <Section title="OTHER OCCUPANTS">
            {form.otherOccupants.map((o, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border border-gray-200"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm text-black"
                    placeholder="Full Name"
                    value={o.name}
                    onChange={(e) => updateOccupant(i, "name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    className="w-full  text-black px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                    placeholder="Age"
                    value={o.age}
                    onChange={(e) => updateOccupant(i, "age", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Relationship
                  </label>
                  <input
                    className="w-full  text-black px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                    placeholder="Relationship"
                    value={o.relationship}
                    onChange={(e) =>
                      updateOccupant(i, "relationship", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addOccupant}
              className="bg-gray-200 text-gray-800 px-4 py-2 text-sm font-semibold hover:bg-gray-300 border border-gray-400"
            >
              + Add Occupant
            </button>
          </Section>

          {/* ================= VEHICLES ================= */}
          <Section title="VEHICLES">
            {form.vehicles.map((v, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border border-gray-200"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Make
                  </label>
                  <input
                    className="w-full px-3  text-black py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                    placeholder="Make"
                    value={v.make}
                    onChange={(e) => updateVehicle(i, "make", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Model
                  </label>
                  <input
                    className="w-full px-3   text-black py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                    placeholder="Model"
                    value={v.model}
                    onChange={(e) => updateVehicle(i, "model", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    className="w-full px-3  text-black py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                    placeholder="Year"
                    value={v.year}
                    onChange={(e) => updateVehicle(i, "year", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    License Plate
                  </label>
                  <input
                    className="w-full px-3  text-black py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                    placeholder="License"
                    value={v.license}
                    onChange={(e) =>
                      updateVehicle(i, "license", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addVehicle}
              className="bg-gray-200 text-gray-800 px-4 py-2 text-sm font-semibold hover:bg-gray-300 border border-gray-400"
            >
              + Add Vehicle
            </button>
          </Section>

          {/* ================= ADDITIONAL INFORMATION ================= */}
          <Section title="ADDITIONAL INFORMATION">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Pets
                </label>
                <textarea
                  className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm resize-none"
                  rows={2}
                  placeholder="Describe any pets"
                  value={form.pets}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, pets: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Water Furniture
                </label>
                <textarea
                  className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm resize-none"
                  rows={2}
                  placeholder="Water furniture details"
                  value={form.waterFurniture}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      waterFurniture: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Delinquent History
                </label>
                <textarea
                  className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm resize-none"
                  rows={2}
                  placeholder="Any delinquent payment history"
                  value={form.delinquentHistory}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      delinquentHistory: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Eviction History
                </label>
                <textarea
                  className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm resize-none"
                  rows={2}
                  placeholder="Any eviction history"
                  value={form.evictionHistory}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      evictionHistory: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Application Fee
                </label>
                <input
                  className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                  placeholder="Application fee amount"
                  type="number"
                  value={form.applicationFee}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      applicationFee: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </Section>

          {/* ================= SUBMIT SECTION ================= */}
          <div className="border-t-2 border-gray-800 pt-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Electronic Signature *
              </label>
              <input
                type="text"
                placeholder="Type your full legal name as signature"
                className="w-full px-3 py-2 border-b-2 text-black border-gray-600 focus:outline-none focus:border-gray-800 bg-transparent text-sm italic"
                required
              />
            </div>

            <div className="text-xs text-gray-600 mb-6">
              <p className="mb-2">
                By signing above, I certify that all information provided in
                this application is true and complete to the best of my
                knowledge. I understand that any misrepresentation may result in
                denial of my application.
                <br />
                <br />
                <br />
                The information on this application is true and correct to the
                best of my knowledge. I hereby authorize
                <span className="font-bold"> RivoRent Inc.</span> or agents to
                verify the above information and obtain consumer or
                investigative credit report, criminal background report, and/or
                eviction records from E-Renter USA. I understand that the{" "}
                <span className="font-bold">$60</span> fee for verifying this
                rental application is not a deposit, will not be applied to any
                rent, or refunded even if the application to rent is declined.
              </p>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gray-800 text-white py-3 font-bold text-lg hover:bg-gray-900 transition-colors border-2 border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "SUBMITTING APPLICATION..."
                : "SUBMIT RENTAL APPLICATION"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

/* ================= SECTION WRAPPER ================= */
function Section({ title, children }) {
  return (
    <div className="mb-8">
      <div className="bg-gray-800 text-white px-4 py-2 mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

/* ================= APPLICANT FORM ================= */
function ApplicantForm({
  applicant,
  form,
  setApplicantField,
  setApplicantNested,
  addReference,
  updateReference,
}) {
  const ap = form[applicant];

  return (
    <>
      {/* BASIC INFORMATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm text-black"
            placeholder="Full Name"
            value={ap.name}
            onChange={(e) =>
              setApplicantField(applicant, "name", e.target.value)
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            SSN *
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm text-black"
            placeholder="SSN"
            value={ap.ssn}
            onChange={(e) =>
              setApplicantField(applicant, "ssn", e.target.value)
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Drivers License Number
          </label>
          <input
            className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
            placeholder="DL Number"
            value={ap.dlNumber}
            onChange={(e) =>
              setApplicantField(applicant, "dlNumber", e.target.value)
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Date of Birth *
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm text-black"
            type="date"
            value={ap.dateOfBirth}
            onChange={(e) =>
              setApplicantField(applicant, "dateOfBirth", e.target.value)
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Home Phone *
          </label>
          <input
            className=" text-black w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
            placeholder="Home Phone"
            value={ap.phoneHome}
            onChange={(e) =>
              setApplicantField(applicant, "phoneHome", e.target.value)
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Work Phone
          </label>
          <input
            className="w-full px-3 text-black py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
            placeholder="Work Phone"
            value={ap.phoneWork}
            onChange={(e) =>
              setApplicantField(applicant, "phoneWork", e.target.value)
            }
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          className="w-full px-3 py-2 text-black border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
          placeholder="Email"
          value={ap.email}
          onChange={(e) =>
            setApplicantField(applicant, "email", e.target.value)
          }
          required
        />
      </div>

      {/* EMPLOYMENT INFORMATION */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-3 border-b pb-2">
          Employment Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Employer *
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Employer"
              value={ap.employment.employer}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "employment",
                  "employer",
                  e.target.value
                )
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Position *
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Position"
              value={ap.employment.position}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "employment",
                  "position",
                  e.target.value
                )
              }
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Employer Address
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Address"
              value={ap.employment.address}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "employment",
                  "address",
                  e.target.value
                )
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              City/State/Zip
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="City/State/Zip"
              value={ap.employment.cityStateZip}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "employment",
                  "cityStateZip",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Phone"
              value={ap.employment.phone}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "employment",
                  "phone",
                  e.target.value
                )
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Supervisor
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Supervisor"
              value={ap.employment.supervisor}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "employment",
                  "supervisor",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              How Long Employed *
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="How Long?"
              value={ap.employment.howLong}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "employment",
                  "howLong",
                  e.target.value
                )
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Salary *
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Salary"
              value={ap.employment.salary}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "employment",
                  "salary",
                  e.target.value
                )
              }
              required
            />
          </div>
        </div>
      </div>

      {/* RENTAL HISTORY */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-3 border-b pb-2">
          Rental History
        </h3>

        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          Present Address
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address *
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Present Address"
              value={ap.rentalHistory.presentAddress}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "rentalHistory",
                  "presentAddress",
                  e.target.value
                )
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Rent or Own *
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Present Rent/Own"
              value={ap.rentalHistory.presentRentOrOwn}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "rentalHistory",
                  "presentRentOrOwn",
                  e.target.value
                )
              }
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Amount Paid *
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Amount Paid"
              value={ap.rentalHistory.presentAmountPaid}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "rentalHistory",
                  "presentAmountPaid",
                  e.target.value
                )
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Reason for Leaving *
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Reason Leaving"
              value={ap.rentalHistory.presentReasonLeaving}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "rentalHistory",
                  "presentReasonLeaving",
                  e.target.value
                )
              }
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Landlord Name
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Landlord Name"
              value={ap.rentalHistory.presentLandlordName}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "rentalHistory",
                  "presentLandlordName",
                  e.target.value
                )
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Landlord Phone
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Landlord Phone"
              value={ap.rentalHistory.presentLandlordPhone}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "rentalHistory",
                  "presentLandlordPhone",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          Previous Address
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Previous Address"
              value={ap.rentalHistory.previousAddress}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "rentalHistory",
                  "previousAddress",
                  e.target.value
                )
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Rent or Own
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Previous Rent/Own"
              value={ap.rentalHistory.previousRentOrOwn}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "rentalHistory",
                  "previousRentOrOwn",
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </div>

      {/* BANKING INFORMATION */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-3 border-b pb-2">
          Banking Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Bank Name *
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Bank Name"
              value={ap.banking.bankName}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "banking",
                  "bankName",
                  e.target.value
                )
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Phone"
              value={ap.banking.bankPhone}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "banking",
                  "bankPhone",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Address"
              value={ap.banking.address}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "banking",
                  "address",
                  e.target.value
                )
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Account Number *
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Account Number"
              value={ap.banking.accountNumber}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "banking",
                  "accountNumber",
                  e.target.value
                )
              }
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Account Type *
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Account Type"
              value={ap.banking.accountType}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "banking",
                  "accountType",
                  e.target.value
                )
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Balance *
            </label>
            <input
              className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              placeholder="Balance"
              value={ap.banking.balance}
              onChange={(e) =>
                setApplicantNested(
                  applicant,
                  "banking",
                  "balance",
                  e.target.value
                )
              }
              required
            />
          </div>
        </div>
      </div>

      {/* PERSONAL REFERENCES */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-3 border-b pb-2">
          Personal References
        </h3>
        {ap.personalReferences.map((ref, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                placeholder="Name"
                value={ref.name}
                onChange={(e) =>
                  updateReference(applicant, i, "name", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                City/State/Zip
              </label>
              <input
                className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                placeholder="City/State/Zip"
                value={ref.cityStateZip}
                onChange={(e) =>
                  updateReference(applicant, i, "cityStateZip", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Relationship
              </label>
              <input
                className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                placeholder="Relationship"
                value={ref.relationship}
                onChange={(e) =>
                  updateReference(applicant, i, "relationship", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone
              </label>
              <input
                className="w-full px-3 py-2 border text-black border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                placeholder="Phone"
                value={ref.phone}
                onChange={(e) =>
                  updateReference(applicant, i, "phone", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addReference(applicant)}
          className="bg-gray-200 text-gray-800 px-4 py-2 text-sm font-semibold hover:bg-gray-300 border border-gray-400"
        >
          + Add Reference
        </button>
      </div>

      {/* DOCUMENT UPLOAD */}
      <div className="mb-6">
        <h3 className="text-md text-black font-semibold mb-3 border-b pb-2">
          Upload Documents
        </h3>
        <UploadField
          onUpload={(fileObj) =>
            setApplicantField(applicant, "documents", [
              ...ap.documents,
              fileObj,
            ])
          }
        />
      </div>

      {/* SIGNATURE */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-3 border-b pb-2">
          Signature
        </h3>
        <SignaturePadComponent
          onEnd={(base64) =>
            setApplicantField(applicant, "signature", {
              dataURL: base64,
              signedAt: new Date().toISOString(),
            })
          }
        />
      </div>
    </>
  );
}
