import React, { useState } from "react";
import axios from "axios"; // Ensure axios is installed

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [extractedData, setExtractedData] = useState("");

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Upload file to backend
      const uploadResponse = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Get the file URI from the response
      const fileUri = uploadResponse.data.fileUri;

      // Generate content from the file URI
      const generateResponse = await axios.post("http://localhost:5000/generate-content", {
        fileUri,
        prompt: "Extract invoice, product, and customer data",
      });      

      setExtractedData(generateResponse.data.generatedContent);
    } catch (err) {
      setError("Error processing file: " + err.message);
    }
  };

  return (
    <div>
      <h2>File Uploader</h2>
      <input
        type="file"
        accept=".pdf,.jpg,.png"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setError(""); // Reset errors on new file selection
        }}
      />
      <button onClick={handleFileUpload}>Upload & Extract Data</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {extractedData && (
        <div>
          <h3>Extracted Data:</h3>
          <pre>{extractedData}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
