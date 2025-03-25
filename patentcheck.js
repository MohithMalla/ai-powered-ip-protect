import { useState } from "react";
import "./patentcheck.css";

export default function Patentcheck() {
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert("Invalid file type! Please upload PNG, JPG, JPEG or PDF.");
        return;
      }

      if (selectedFile.size > 25 * 1024 * 1024) {
        alert("File size exceeds 25MB limit.");
        return;
      }

      setFile(selectedFile);
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Patent Check Process :</h1>
      <div className="upload-container">
        <h3 className="upload-title">Upload File</h3>
        <label className="drop-area">
          <input type="file" accept="image/png, image/jpeg, application/pdf" onChange={handleFileChange} />
          <div className="upload-box">
            <span className="upload-icon">⬆️</span>
            <p className="upload-text">
              <strong>Drop files here</strong> or <span className="upload-link">Click to upload Files</span>
            </p>
          </div>
        </label>

        {file && (
          <div className="file-info">
            <img src="pdf-icon.png" alt="File Icon" className="file-icon" />
            <p>{file.name}</p>
          </div>
        )}

        <p className="upload-info">
          <strong>File Formats Accepted:</strong> PNG, JPG, JPEG, PDF*<br />
          <strong>Max. file size:</strong> 25 MB<br />
          <strong>Min. resolution:</strong> 150 dpi
        </p>
      </div>

      {showPopup && (
        <div className="popup">
          <p>Not a Fake!</p>
        </div>
      )}
    </div>
  );
}
