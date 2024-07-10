import sharp from "sharp";

export const convertImageToWebP = async (buffer) => {
  return sharp(buffer).webp({ quality: 80 }).toBuffer();
};
