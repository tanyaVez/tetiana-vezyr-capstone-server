import multer from "multer";
import { v1 as uuid } from "uuid";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const storage = multer.diskStorage ({
  destination: (_req, _file, cb) => {
    cb(null, "public/images");
  },
  filename: (_req, file, cb) => {
    const fileExtension = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${uuid()}.${fileExtension}`);
  },
  fileFilter: (_req, file, cb) => {
    const isValid = Boolean(MIME_TYPE_MAP[file.mimetype]);
    const error = isValid ? null : new Error("Invalid file type. Only png, jpg, jpeg are allowed.");
    cb(error, isValid);
  },
});

const imageUpload = multer({ storage });

export default imageUpload;
