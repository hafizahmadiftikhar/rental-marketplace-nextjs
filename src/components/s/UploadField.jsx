"use client";
import { useState } from "react";

export default function UploadField({ onUpload, accept }) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/uploadform", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        onUpload({
          url: data.url,
          originalName: file.name,
          public_id: data.public_id,
        });
      } else {
        alert("Upload failed for " + file.name);
      }
    }

    setUploading(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        accept={accept || "*/*"}
        type="file"
        multiple              // <<<<<< ENABLE MULTIPLE UPLOAD
        onChange={handleUpload}
      />

      {uploading && <p>Uploading...</p>}
    </div>
  );
}
