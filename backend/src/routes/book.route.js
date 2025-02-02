import express from "express";
import multer from "multer";
import storage from "../middlewares/multer.middleware.js"
import { addBook, deleteBook, getBookByID, updateBook, searchBook, getBooks } from "../controllers/book.controller.js";

const bookRouter = express.Router();
const upload = multer({ storage: storage })

bookRouter.route("/").get(getBooks)

bookRouter.route("/add").post(upload.single('image'), addBook)

bookRouter.route("/:id").get(getBookByID).patch(updateBook).delete(deleteBook)

bookRouter.route("/search/all").get(searchBook);

export default bookRouter;