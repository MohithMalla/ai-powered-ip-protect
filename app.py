from flask import Flask, request, send_file, render_template
import cv2
import numpy as np
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Function to embed invisible watermark
import cv2

def embed_watermark(image_path, output_path, watermark_text):
    image = cv2.imread(image_path)
    h, w, _ = image.shape

    # Convert watermark text to binary
    binary_watermark = ''.join(format(ord(i), '08b') for i in watermark_text)

    # Ensure watermark fits in the image
    if len(binary_watermark) > h * w:
        raise ValueError("Watermark text is too large for the given image")

    binary_index = 0
    for i in range(h):
        for j in range(w):
            if binary_index < len(binary_watermark):
                pixel = image[i, j]
                pixel[0] = (pixel[0] & 0xFE) | int(binary_watermark[binary_index])  # Modify LSB of Blue channel
                binary_index += 1

    cv2.imwrite(output_path, image)

def extract_watermark(image_path, length):
    image = cv2.imread(image_path)
    h, w, _ = image.shape

    binary_watermark = ""
    binary_index = 0

    required_bits = length * 8

    for i in range(h):
        for j in range(w):
            if binary_index < required_bits:  # Extract only required bits
                pixel = image[i, j]
                bit = str(pixel[0] & 1)  # Extract LSB from Blue channel
                binary_watermark += bit
                binary_index += 1
            else:
                break
        if binary_index >= required_bits:
            break

    # Debugging prints
    print("Extracted binary watermark:", binary_watermark)

    # Ensure binary string is divisible by 8
    if len(binary_watermark) != required_bits:
        print("Error: Binary watermark length is incorrect")
        return "Decoding Error"

    # Convert binary to text
    try:
        watermark_text = ''.join(chr(int(binary_watermark[i:i+8], 2)) for i in range(0, len(binary_watermark), 8))
        print("Extracted watermark text:", watermark_text)  # Debugging print
        return watermark_text
    except ValueError:
        print("Decoding Error: invalid binary sequence")
        return "Decoding Error"

embed_watermark("C:\\Users\\Mohithsai Malla\\OneDrive\\Pictures\\133857710653005516.png","C:\\Users\\Mohithsai Malla\\OneDrive\\Pictures\\133862651713303698.png","hello")
extract_watermark("C:\\Users\\Mohithsai Malla\\OneDrive\\Pictures\\133862651713303698.png",5)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload_and_watermark():
    if "image" not in request.files:
        return "No file uploaded", 400
    
    file = request.files["image"]
    watermark_text = request.form.get("watermark", "SecretWatermark")

    image_path = os.path.join(UPLOAD_FOLDER, "uploaded.jpg")
    output_path = os.path.join(UPLOAD_FOLDER, "watermarked.jpg")
    
    file.save(image_path)
    embed_watermark(image_path, output_path, watermark_text)
    
    return send_file(output_path, as_attachment=True)

@app.route("/extract", methods=["POST"])
def extract():
    if "image" not in request.files:
        return "No file uploaded", 400
    
    file = request.files["image"]
    length = int(request.form.get("length", 20))  # Set default length

    image_path = os.path.join(UPLOAD_FOLDER, "uploaded_extract.jpg")
    file.save(image_path)
    
    extracted_text = extract_watermark(image_path, length)
    
    return f"Extracted Watermark: {extracted_text}"

if __name__ == "__main__":
    app.run(debug=True)
