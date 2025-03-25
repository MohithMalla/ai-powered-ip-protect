import { useState } from "react";
import "./patentcheck.css";

export default function Invisiblewatermark() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const allowedTypes = ["image/png", "image/jpeg","image/jpg"];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert("Invalid Image type! Please upload PNG, JPG, JPEG .");
        return;
      }

      if (selectedFile.size > 25 * 1024 * 1024) {
        alert("File size exceeds 25MB limit.");
        return;
      }

      setFile(selectedFile);
    }
  };

  return (
    <div><h1>NFT Generation Process :</h1>
    <div className="upload-container">
      <h3 className="upload-title">Upload Image</h3>
      <label className="drop-area">
        <input type="file" accept="image/png, image/jpeg, image/gif, application/pdf" onChange={handleFileChange} />
        <div className="upload-box">
          <span className="upload-icon">⬆️</span>
          <p className="upload-text">
            <strong>Drop Image here</strong> or <span className="upload-link">Click to upload the Image</span>
          </p>
        </div>
      </label>

      {file && (
        <div className="file-info">
          <img src="pdf-icon.png" alt="PDF File" className="file-icon" />
          <p>{file.name}</p>
        </div>
      )}

      <p className="upload-info">
        <strong>Image Formats Accepted:</strong> PNG, JPG, JPEG<br />
        <strong>Max. Image size:</strong> 25 MB<br />
        <strong>Min. resolution:</strong> 150 dpi
      </p>
    </div>
    </div>
  );
}
