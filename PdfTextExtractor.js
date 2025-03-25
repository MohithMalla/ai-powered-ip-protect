import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// Fix: Set worker source manually using a CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfTextExtractor = () => {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      extractTextFromPDF(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const extractTextFromPDF = async (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async () => {
      const typedArray = new Uint8Array(fileReader.result);
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        extractedText += pageText + "\n\n"; // Add spacing between pages
      }

      setText(extractedText);
    };
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>PDF Text Extractor</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {fileName && <h3>Extracted Text from: {fileName}</h3>}
      <textarea
        value={text}
        readOnly
        rows={15}
        cols={80}
        style={{ marginTop: "10px", fontSize: "14px", padding: "10px", width: "90%" }}
      />
    </div>
  );
};

export default PdfTextExtractor;
