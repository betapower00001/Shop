'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setPreviewUrl(data.url);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">อัปโหลดไฟล์</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        อัปโหลด
      </button>

      {previewUrl && (
        <div className="mt-4">
          <p>แสดงตัวอย่าง:</p>
          <img src={previewUrl} alt="Uploaded file" className="max-w-xs" />
        </div>
      )}
    </div>
  );
}
