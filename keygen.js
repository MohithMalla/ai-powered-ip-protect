import { useState } from "react";
import "./patentcheck.css";

export default function Keygeneration() {
  const [file, setFile] = useState(null);
  const [uniqueKey, setUniqueKey] = useState("");

  const generateUniqueKey = () => {
    return Math.random().toString(36).substr(2, 10).toUpperCase();
  };
  

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
 try{
    if (selectedFile) {
      const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
     console.log(file,uniqueKey)
     console.log(allowedTypes)
      

      setFile(selectedFile);
      const newKey = generateUniqueKey();
      setUniqueKey(newKey);
      
      alert(`Unique Key Generated: ${newKey}\n(Copied to clipboard)`);
    }
  }
    catch(err){
      console.log(err)
    }
  };
  

  return (
    <div><h1>Unique Key Generation Process :</h1>
    <div className="upload-container">
      <h3 className="upload-title">Upload Image</h3>
      <label className="drop-area">
        <input type="file" accept="image/png, image/jpeg, image/gif, application/pdf" onChange={handleFileChange} />
        <div className="upload-box">
          <span className="upload-icon">⬆️</span>
          <p className="upload-text">
            <strong>Drop files here</strong> or <span className="upload-link">Click to upload</span>
          </p>
        </div>
      </label>

      <p className="upload-info">
        <strong>File Formats Accepted:</strong> PNG, JPG, JPEG, GIF, PDF*<br />
        <strong>Max. file size:</strong> 25 MB<br />
        <strong>Min. resolution:</strong> 150 dpi
      </p>
    </div>
    </div>
  );
}
