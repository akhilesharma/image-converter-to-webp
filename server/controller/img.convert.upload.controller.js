import { uploadToCloudinary } from "../utils/cloudinary.js";
import { convertImageToWebP } from "../utils/sharp.js";

export const convertToWebPandUploadonCloudinary = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No image files provided.");
  }

  try {
    const uploadPromises = req.files.map(async (file) => {
      const webpBuffer = await convertImageToWebP(file.buffer);

      const originalName = file.originalname.split(".").slice(0, -1).join(".");

      const result = await uploadToCloudinary(webpBuffer, originalName);

      return result.secure_url;
    });

    const urls = await Promise.all(uploadPromises);

    res.status(200).json({
      message: "Images uploaded successfully!",
      urls,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to process images",
      error: error.message,
    });
  }
};
