import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { convertImageToWebP } from "../utils/sharp.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, "../public/convertedImg");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const saveConvertedImages = async (files) => {
  try {
    const convertedFiles = await Promise.all(
      files.map(async (file) => {
        const webpBuffer = await convertImageToWebP(file.buffer);
        const outputFileName = path.parse(file.originalname).name + ".webp";
        const outputPath = path.join(outputDir, outputFileName);

        await fs.promises.writeFile(outputPath, webpBuffer);

        return outputFileName;
      })
    );
    return convertedFiles;
  } catch (error) {
    throw new Error("Error saving converted images");
  }
};

export const convertToWebp = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  try {
    const convertedFiles = await saveConvertedImages(req.files);
    res
      .status(200)
      .json({ message: "Convert to webp Successfully", files: convertedFiles });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};
