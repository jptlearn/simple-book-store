import express from "express";
import multer from "multer";
import storage from "../middlewares/multer.middleware.js"
import { addBook, getBookByID } from "../controllers/book.controller.js";

const bookRouter = express.Router();
const upload = multer({ storage: storage })

bookRouter.route("/add").post(upload.single('image'), addBook)

bookRouter.route("/:id").get(getBookByID)

export default bookRouter;