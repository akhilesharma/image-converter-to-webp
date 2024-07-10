import { useState } from "react";
import axios from "axios";

const ImageConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("image", selectedFiles[i]); // Ensure the key matches the backend expectation
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/converttowebp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadMessage(response.data.message);
    } catch (error) {
      console.error("Error uploading images:", error);
      setUploadMessage("Error uploading images.");
    }
  };

  return (
    <div>
      <h2>2 Convert Image to WebP</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Convert</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default ImageConverter;
