// IMPORTING MODULES
import multer from "multer";
import path from "path";

// MULTER CONFIGURATION
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "blogImg") {
      cb(null, "public/images/blogs");
    } else {
      cb(null, "public/images/others");
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "blogImg") {
      cb(null, `${req.body.blogTitle}${path.extname(file.originalname)}`);
    } else {
      cb(null, `${req.body.fileName}${path.extname(file.originalname)}`);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// MULTER UPLOAD
const upload = multer({ storage });

// EXPORTING FUNCTIONS
export { upload as UPLOAD };
