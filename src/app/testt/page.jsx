"use client";
import { useState } from "react";

export default function UploadField({ onUpload }) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    const res = await fetch("/api/uploadform", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setUploading(false);

    if (data.url) {
      onUpload(data.url);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="file" onChange={handleUpload} />

      {uploading && <p>Uploading...</p>}
    </div>
  );
}
