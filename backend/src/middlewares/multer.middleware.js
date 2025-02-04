import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";

const storage = process.env.NODE_ENV === 'production'
  ? new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'book-store',
      allowed_formats: ['jpeg', 'jpg', 'png'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
  })
  : multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    }
  });

export default storage;
