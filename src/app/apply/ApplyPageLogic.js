"use client";

import { useState } from "react";

export default function ApplyPageLogic() {
  // Create a proper deep clone function for empty applicant
  const createEmptyApplicant = () => ({
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
  });

  const [applicant1, setApplicant1] = useState(createEmptyApplicant());
  const [applicant2, setApplicant2] = useState(createEmptyApplicant());
  const [useApplicant2, setUseApplicant2] = useState(false);

  const [otherOccupants, setOtherOccupants] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [pets, setPets] = useState("");
  const [waterFurniture, setWaterFurniture] = useState("");
  const [delinquentHistory, setDelinquentHistory] = useState("");
  const [evictionHistory, setEvictionHistory] = useState("");
  const [applicationFee, setApplicationFee] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ================= Nested field setter =================
  function setApplicantField(appIndex, path, value) {
    const setter = appIndex === 1 ? setApplicant1 : setApplicant2;
    const app = appIndex === 1 ? { ...applicant1 } : { ...applicant2 };

    const parts = path.split(".");
    let curr = app;
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      curr[p] = { ...curr[p] }; // ensure immutability
      curr = curr[p];
    }
    curr[parts[parts.length - 1]] = value;
    setter(app);
  }

  // ================= File Upload =================
  function handleFileUpload(appIndex, uploaded) {
    const setter = appIndex === 1 ? setApplicant1 : setApplicant2;
    const app = appIndex === 1 ? { ...applicant1 } : { ...applicant2 };
    app.documents = [...(app.documents || []), { 
      url: uploaded.url, 
      type: uploaded.originalName,
      uploadedAt: new Date().toISOString()
    }];
    setter(app);
  }

  // ================= Signature =================
  function handleSignature(appIndex, dataURL) {
    const now = dataURL ? new Date().toISOString() : null;
    const setter = appIndex === 1 ? setApplicant1 : setApplicant2;
    const app = appIndex === 1 ? { ...applicant1 } : { ...applicant2 };
    
    app.signature = {
      dataURL: dataURL,
      signedAt: now
    };
    setter(app);
  }

  // ================= Personal References for each applicant =================
  const addPersonalReference = (appIndex) => {
    const setter = appIndex === 1 ? setApplicant1 : setApplicant2;
    const app = appIndex === 1 ? { ...applicant1 } : { ...applicant2 };
    app.personalReferences = [
      ...(app.personalReferences || []), 
      { name: "", address: "", cityStateZip: "", relationship: "", phone: "" }
    ];
    setter(app);
  };

  const updatePersonalReference = (appIndex, refIndex, key, value) => {
    const setter = appIndex === 1 ? setApplicant1 : setApplicant2;
    const app = appIndex === 1 ? { ...applicant1 } : { ...applicant2 };
    const references = [...(app.personalReferences || [])];
    references[refIndex] = { ...references[refIndex], [key]: value };
    app.personalReferences = references;
    setter(app);
  };

  const removePersonalReference = (appIndex, refIndex) => {
    const setter = appIndex === 1 ? setApplicant1 : setApplicant2;
    const app = appIndex === 1 ? { ...applicant1 } : { ...applicant2 };
    const references = [...(app.personalReferences || [])];
    references.splice(refIndex, 1);
    app.personalReferences = references;
    setter(app);
  };

  // ================= Other Occupants =================
  const addOtherOccupant = () => setOtherOccupants([...otherOccupants, { name: "", age: "", relationship: "" }]);
  const updateOtherOccupant = (i, key, val) => {
    const copy = [...otherOccupants];
    copy[i][key] = val;
    setOtherOccupants(copy);
  };
  const removeOtherOccupant = (i) => {
    const copy = [...otherOccupants];
    copy.splice(i, 1);
    setOtherOccupants(copy);
  };

  // ================= Vehicles =================
  const addVehicle = () => setVehicles([...vehicles, { make: "", model: "", year: "", license: "" }]);
  const updateVehicle = (i, key, val) => {
    const copy = [...vehicles];
    copy[i][key] = val;
    setVehicles(copy);
  };
  const removeVehicle = (i) => {
    const copy = [...vehicles];
    copy.splice(i, 1);
    setVehicles(copy);
  };

  // ================= Reset Applicant 2 when unchecked =================
  const handleUseApplicant2Change = (checked) => {
    setUseApplicant2(checked);
    if (!checked) {
      // Reset applicant2 when unchecked
      setApplicant2(createEmptyApplicant());
    }
  };

  // ================= Submit =================
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    // Validate required fields
    if (!applicant1.name || !applicant1.email || !applicant1.phoneHome) {
      alert("Please fill in all required fields for Applicant 1: Name, Email, and Home Phone");
      setSubmitting(false);
      return;
    }

    // Prepare the payload according to the corrected schema
    const payload = {
      applicant1: {
        ...applicant1,
        personalReferences: applicant1.personalReferences || []
      },
      applicant2: useApplicant2 ? {
        ...applicant2,
        personalReferences: applicant2.personalReferences || []
      } : null,
      otherOccupants: otherOccupants.filter(occ => occ.name.trim() !== ""), // Only non-empty occupants
      vehicles: vehicles.filter(vehicle => vehicle.make.trim() !== ""), // Only non-empty vehicles
      pets: pets || "",
      waterFurniture: waterFurniture || "",
      delinquentHistory: delinquentHistory || "",
      evictionHistory: evictionHistory || "",
      applicationFee: applicationFee ? Number(applicationFee) : null,
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Submit error: " + (err?.error || res.statusText));
        setSubmitting(false);
        return;
      }

      // Download PDF
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rental-application-${new Date().getTime()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      alert("Application submitted successfully! Data saved to database and PDF downloaded.");
      
      // Optional: Reset form after successful submission
      // resetForm();

    } catch (err) {
      console.error("Submission failed:", err);
      alert("Submission failed: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  // Optional: Form reset function
  const resetForm = () => {
    setApplicant1(createEmptyApplicant());
    setApplicant2(createEmptyApplicant());
    setUseApplicant2(false);
    setOtherOccupants([]);
    setVehicles([]);
    setPets("");
    setWaterFurniture("");
    setDelinquentHistory("");
    setEvictionHistory("");
    setApplicationFee("");
  };

  return {
    applicant1,
    applicant2,
    useApplicant2,
    otherOccupants,
    vehicles,
    pets,
    waterFurniture,
    delinquentHistory,
    evictionHistory,
    applicationFee,
    submitting,
    setApplicantField,
    handleFileUpload,
    handleSignature,
    addPersonalReference,
    updatePersonalReference,
    removePersonalReference,
    addOtherOccupant,
    updateOtherOccupant,
    removeOtherOccupant,
    addVehicle,
    updateVehicle,
    removeVehicle,
    handleSubmit,
    setUseApplicant2: handleUseApplicant2Change,
    setPets,
    setWaterFurniture,
    setDelinquentHistory,
    setEvictionHistory,
    setApplicationFee,
    resetForm,
  };
}