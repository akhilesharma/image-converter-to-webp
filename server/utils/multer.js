import multer from "multer";
import path from "path";
const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: File type not supported!");
    }
  },
});
