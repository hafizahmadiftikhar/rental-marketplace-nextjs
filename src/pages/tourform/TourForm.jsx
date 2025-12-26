"use client";
import { useState } from "react";

export default function TourForm() {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    ssn: "",
    driversLicense: "",

    // Contact Information
    email: "",
    phone: "",
    alternatePhone: "",

    // Address Information
    currentAddress: "",
    city: "",
    state: "",
    zipCode: "",
    yearsAtAddress: "",

    // Employment Information
    employerName: "",
    jobTitle: "",
    employmentDuration: "",
    annualIncome: "",

    // Additional Details
    emergencyContact: "",
    emergencyPhone: "",
    preferredTourDate: "",
    preferredTourTime: "",
    additionalComments: "",

    // Documents
    idDocument: null,
    incomeProof: null,
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(
      "Form submitted successfully! This would typically be processed as a PDF."
    );
  };

  return (
    <div className="flex justify-center items-start py-10 bg-gray-100 min-h-screen">
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
            OFFICIAL APARTMENT TOUR REQUEST FORM
          </h1>
          <p className="text-sm text-gray-600 uppercase tracking-wide">
            Confidential Application Document - For Internal Use Only
          </p>
        </div>

        {/* Section 1: Personal Information */}
        <div className="mb-8">
          <div className="bg-gray-800 text-white px-4 py-2 mb-4">
            <h2 className="text-lg font-bold">
              SECTION I: PERSONAL INFORMATION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Social Security Number *
              </label>
              <input
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleChange}
                placeholder="XXX-XX-XXXX"
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Driver's License/State ID *
              </label>
              <input
                type="text"
                name="driversLicense"
                value={formData.driversLicense}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Information */}
        <div className="mb-8">
          <div className="bg-gray-800 text-white px-4 py-2 mb-4">
            <h2 className="text-lg font-bold">
              SECTION II: CONTACT INFORMATION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Primary Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Alternate Phone
            </label>
            <input
              type="tel"
              name="alternatePhone"
              value={formData.alternatePhone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
            />
          </div>
        </div>

        {/* Section 3: Current Address */}
        <div className="mb-8">
          <div className="bg-gray-800 text-white px-4 py-2 mb-4">
            <h2 className="text-lg font-bold">SECTION III: CURRENT ADDRESS</h2>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                ZIP Code *
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Years at Current Address *
            </label>
            <input
              type="text"
              name="yearsAtAddress"
              value={formData.yearsAtAddress}
              onChange={handleChange}
              placeholder="e.g., 2 years, 6 months"
              className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
              required
            />
          </div>
        </div>

        {/* Section 4: Employment Information */}
        <div className="mb-8">
          <div className="bg-gray-800 text-white px-4 py-2 mb-4">
            <h2 className="text-lg font-bold">
              SECTION IV: EMPLOYMENT INFORMATION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Current Employer *
              </label>
              <input
                type="text"
                name="employerName"
                value={formData.employerName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Job Title/Position *
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Employment Duration *
              </label>
              <input
                type="text"
                name="employmentDuration"
                value={formData.employmentDuration}
                onChange={handleChange}
                placeholder="e.g., 3 years, 8 months"
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Annual Income *
              </label>
              <input
                type="text"
                name="annualIncome"
                value={formData.annualIncome}
                onChange={handleChange}
                placeholder="e.g., $65,000"
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 5: Additional Information */}
        <div className="mb-8">
          <div className="bg-gray-800 text-white px-4 py-2 mb-4">
            <h2 className="text-lg font-bold">
              SECTION V: ADDITIONAL INFORMATION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Emergency Contact Name *
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Emergency Contact Phone *
              </label>
              <input
                type="tel"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Preferred Tour Date *
              </label>
              <input
                type="date"
                name="preferredTourDate"
                value={formData.preferredTourDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Preferred Tour Time *
              </label>
              <select
                name="preferredTourTime"
                value={formData.preferredTourTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              >
                <option value="">Select Time</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Additional Comments or Special Requests
            </label>
            <textarea
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm resize-none"
              placeholder="Any additional information or special accommodation requests..."
            />
          </div>
        </div>

        {/* Section 6: Document Upload */}
        <div className="mb-8">
          <div className="bg-gray-800 text-white px-4 py-2 mb-4">
            <h2 className="text-lg font-bold">
              SECTION VI: REQUIRED DOCUMENTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Government Issued ID *
              </label>
              <input
                type="file"
                name="idDocument"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload driver's license, passport, or state ID
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Proof of Income *
              </label>
              <input
                type="file"
                name="incomeProof"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 bg-white text-sm"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Recent pay stub, W-2, or offer letter
              </p>
            </div>
          </div>
        </div>

        {/* Signature and Submit Section */}
        <div className="border-t-2 border-gray-800 pt-6">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Electronic Signature *
            </label>
            <input
              type="text"
              placeholder="Type your full legal name as signature"
              className="w-full px-3 py-2 border-b-2 border-gray-600 focus:outline-none focus:border-gray-800 bg-transparent text-sm italic"
              required
            />
          </div>

          <div className="text-xs text-gray-600 mb-6">
            <p className="mb-2">
              By signing above, I certify that all information provided in this
              application is true and complete to the best of my knowledge. I
              understand that any misrepresentation may result in denial of my
              application.
            </p>
            <p>Date: {new Date().toLocaleDateString()}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 font-bold text-lg hover:bg-gray-900 transition-colors border-2 border-gray-900"
          >
            SUBMIT TOUR REQUEST APPLICATION
          </button>
        </div>
      </form>
    </div>
  );
}
