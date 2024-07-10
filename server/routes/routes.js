import { Router } from "express";
import { upload } from "../utils/multer.js";
import { convertToWebPandUploadonCloudinary } from "../controller/img.convert.upload.controller.js";
import { convertToWebp } from "../controller/img.convert.controller.js";
const routes = Router();

routes.post(
  "/converttowebpandupload",
  upload.array("image", 100),
  convertToWebPandUploadonCloudinary
);
routes.post("/converttowebp", upload.array("image", 100), convertToWebp);

export default routes;
