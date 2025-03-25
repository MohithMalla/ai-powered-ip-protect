import { useState } from "react";
import "./patentcheck.css";
import axios from "axios";

export default function Webscrap() {
  const [message, setMessage] = useState(null);

  const sampleLinks = [
    "https://www.barley.com/patent-office-issues-new-guidance-on-inventing-with-ai/",
    "https://hbr.org/2023/04/generative-ai-has-an-intellectual-property-problem",
    "https://www.sciencedirect.com/science/article/pii/S0268401222000767",
    "https://southerncalifornialawreview.com/2024/04/16/ai-generated-inventions-implications-for-the-patent-system/",
    "https://news.ycombinator.com/item?id=5810192",
    "https://link.springer.com/article/10.1007/s40319-024-01481-5",
    "https://script-ed.org/article/computers-as-inventors-legal-and-policy-implications-of-artificial-intelligence-on-patent-law/",
    "https://www.procopio.com/ai-related-invention-patenting/",
    "https://www.researchgate.net/publication/377334695_Impact_Of_Artificial_Intelligence_on_Copyright_Law_Challenges_and_Prospects",
    "https://ipwatchdog.com/2020/07/13/artificial-intelligence-cant-patent-inventions/id=123226/",
  ];

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setMessage("Please select a PDF.");
      return;
    }

    setMessage("Uploading...");

    try {
      const formData = new FormData();
      formData.append("pdfFile", file);
      await axios.post("http://localhost:5000/get_example", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Upload error");
    }

    alert("Related Articles:\n" + sampleLinks.join("\n"));
    setMessage("Upload successful.");
  };

  return (
    <div>
      <h1>Prior Analysis Process :</h1>
      <div className="upload-container">
        <h3 className="upload-title">Upload Image or PDF</h3>
        <label className="drop-area">
          <input type="file" accept="application/pdf" onChange={handleUpload} />
          <div className="upload-box">
            <span className="upload-icon">⬆️</span>
            <p className="upload-text">
              <strong>Drop files here</strong> or <span className="upload-link">Click to upload</span>
            </p>
          </div>
        </label>
        <p className="upload-info">
          <strong>File Formats Accepted:</strong> PDF*<br />
          <strong>Max. file size:</strong> 25 MB<br />
          <strong>Min. resolution:</strong> 150 dpi
        </p>
      </div>
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
}
