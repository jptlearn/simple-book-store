import bookModel from "../models/book.model.js";
import textConstant from "../constants/text.constant.js";
import { Op } from "sequelize";

const addBook = async (req, res) => {
  try {
    const { name, author, genre, description } = req.body;
    if (!name || !author || !genre || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: name, author, genre, description of the book",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }
    const newBook = new bookModel({
      name,
      author,
      genre,
      description,
      image: process.env.NODE_ENV === 'production' ? req.file.path : req.file.filename,
    });
    const savedBook = await newBook.save();

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: savedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding book.",
      error: error.message,
    });
  }
};

const getBookByID = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const book = await bookModel.findByPk(id);
      if (!book) {
        return res.status(404).json({ success: false, message: "Book not found" });
      }
      res.json({ success: true, message: book });
    } else {
      res.status(400).json({ success: false, message: textConstant.BOOK_ID_PROVIDED });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error while fetching book", error: error.message });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ success: false, message: textConstant.BOOK_ID_PROVIDED });
    }
    const book = await bookModel.findByPk(id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found with this id." });
    }
    const { name, author, description, genre } = req.body;
    await bookModel.update(
      { name, author, description, genre },
      { where: { id } }
    );
    res.status(200).json({ success: true, message: "Book updated successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating book", error: error.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ message: textConstant.BOOK_ID_PROVIDED });
  }
  const data = await bookModel.destroy({
    where: {
      id,
    },
  });
  if (data) {
    res.status(200).json({ success: true, message: "Book deleted.", data: data });
  } else {
    res.json({
      success: false,
      message: "Error deleting book",
    });
  }
};

const searchBook = async (req, res) => {
  const { q } = req.query;
  const { or } = Op;
  try {
    if (!q) {
      return res.json({
        success: false,
        message: "No query was found in the string.",
      });
    }
    const data = await bookModel.findAll({
      where: {
        [or]: [
          { name: { [Op.like]: `%${q}%` } },
          { author: { [Op.like]: `%${q}%` } },
        ],
      },
      raw: true,
    });
    res.status(200).json({ success: true, message: "Books fetched successfully", data: data ? data : "No data found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error while searching book" });
  }
};

const getBooks = async (req, res) => {
  let { limit } = req.query;
  limit = limit ? parseInt(limit, 10) : 20;
  try {
    const data = await bookModel.findAll({
      limit,
      raw: true,
    });
    res.status(200).json({ success: true, message: "Books fetched successfully", data: data ? data : "No data found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error while fetching data" });
  }
};

export { addBook, getBookByID, updateBook, deleteBook, searchBook, getBooks };
