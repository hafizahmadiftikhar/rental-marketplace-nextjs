"use client";
import { useState } from "react";
import { FaCloudUploadAlt, FaCheckCircle, FaSpinner, FaFile } from "react-icons/fa";

export default function UploadField({ onUpload, accept }) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
        setUploadedFiles((prev) => [...prev, file.name]);
      } else {
        alert("Upload failed for " + file.name);
      }
    }

    setUploading(false);
  }

  return (
    <div className="w-full">
      {/* Drag & Drop Style Upload Box */}
      <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-[#658C58] transition-all">
        <div className="flex flex-col items-center justify-center py-4">
          {uploading ? (
            <FaSpinner className="w-10 h-10 text-[#658C58] mb-2 animate-spin" />
          ) : (
            <FaCloudUploadAlt className="w-10 h-10 text-[#658C58] mb-2" />
          )}
          <p className="mb-1 text-sm text-gray-700 font-medium">
            {uploading ? "Uploading..." : "Click to upload files"}
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, PDF (Multiple files allowed)</p>
        </div>
        <input
          type="file"
          className="hidden"
          multiple
          accept={accept || "*/*"}
          onChange={handleUpload}
        />
      </label>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-3 space-y-2">
          {uploadedFiles.map((fileName, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg"
            >
              <FaCheckCircle className="text-green-600" size={14} />
              <FaFile className="text-gray-500" size={12} />
              <span className="text-sm text-gray-800 truncate">{fileName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}