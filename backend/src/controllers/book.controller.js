import bookModel from "../models/book.model.js";
import textConstant from "../constants/text.constant.js";
import { Op } from "sequelize";
import urlConstant from "../constants/url.constant.js";

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
      image: req.file.filename,
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
      res.json({ success: true, message: book });
    } else {
      res.json({ success: false, message: textConstant.BOOK_ID_PROVIDED });
    }
  } catch (error) {
    console.log("error while fetching book: ", error);
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;

  if (id) {
    const book = await bookModel.findByPk(id);
    if (!book) {
      return res.json({ message: "Book not found with this id." });
    }
    const { name, author, description, genre } = req.body;
    await bookModel.update(
      { name, author, description, genre },
      {
        where: {
          id,
        },
      }
    );
    res.json({ success: true, message: "book updated successfully!!" });
  } else {
    res.json({ success: false, message: textConstant.BOOK_ID_PROVIDED });
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
    res.json({ success: true, message: "Book deleted.", data: data });
  } else {
    res.json({
      success: false,
      message: "Error deleting book",
    });
  }
};

const searchBook = async (req, res) => {
  const { q } = req.query;
  const { or } = Op; // Destructure Op for cleaner code
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
    console.log(data);
    for (let d of data) {
      d.image = urlConstant.IMG_PATH_URL + d.image;
    }
    res.json(data);
  } catch (error) {
    res.send("Error while searching book");
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
    // console.log(data);
    for (let d of data) {
      // console.log(d.dataValues);
      d.image = urlConstant.IMG_PATH_URL + d.image;
    }
    res.json(data);
  } catch (error) {
    res.send("Error while fetching data");
  }
};

export { addBook, getBookByID, updateBook, deleteBook, searchBook, getBooks };
