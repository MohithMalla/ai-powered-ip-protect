import React, { useState } from "react";

import "./invisiblewatermark.css";

function InvisibleWatermark() {
    const [image, setImage] = useState(null);
    

    const handleFileChange = (event, setFunction) => {
        const file = event.target.files[0];
        try{
   
        
        }
        catch(err){
            console.log(err)
        }
        setFunction(file);
    };

    return (
        <div className="container">
            <h1>Invisible Watermarking</h1>

            <div className="upload-section">
                <h2>Upload Image</h2>
                <input type="file" onChange={(e) => handleFileChange(e, setImage)} />

                {image && (
                    <div className="image-preview">
                        <h3>Download Uploaded Image</h3>
                        <img src={URL.createObjectURL(image)} alt="Uploaded" />
                        <br />
                        <a href={URL.createObjectURL(image)} download={image.name}>
                            <button className="btn">Download</button>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InvisibleWatermark;
