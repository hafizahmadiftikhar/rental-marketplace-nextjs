"use client";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select a JSON file first!");

    const text = await file.text();

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: text,
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Upload Property JSON</h1>
      <input type="file" accept=".json" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} style={{ marginLeft: "1rem" }}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}
