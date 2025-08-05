import React, { useState } from 'react';
import { upload_to_cloudinary, uploadfile } from '@/lib/api';
const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e:any) => {
    setFiles(e.target.files);
  };

 const handleUpload = async () => {
  if (files.length === 0) return;

  try {
    // const result = await uploadfile(files); 
    const result=await upload_to_cloudinary(files);
    console.log("Uploaded:", result);
  } catch (err) {
    console.error("Upload error:", err);
  }
};

  return (
    <div className="p-4 border rounded shadow w-fit space-y-2">
      <input type="file" multiple onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload Files
      </button>
    </div>
  );
};

export default FileUpload;
