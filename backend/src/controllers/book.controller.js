import bookModel from "../models/book.model.js";
import { Op } from "sequelize";

const addBook = async (req, res) => {
  try {
    const image = req.file.filename;
    const { name, author, genre, description } = req.body;
    await bookModel.create({
      name,
      author,
      genre,
      description,
      image: image,
    });
    res.json({ success: true, message: "Book added successfully" });
  } catch (error) {
    console.error("Error while adding book", error);
  }
};

const getBookByID = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const book = await bookModel.findByPk(id);
      res.json({ success: true, message: book });
    } else {
      res.json({ success: false, message: "Id is required." });
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
    res.json({ success: false, message: "Book Id not provided." });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ message: "Book Id not provided." });
  }
  const data = await bookModel.destroy({
    where: {
      id,
    },
  });
  if (data) {
    res.json({ success: true, message: "Book deleted." });
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
    });
    console.log(data);
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
      d.image = "http://localhost:8000/" + d.image;
    }
    res.json(data);
  } catch (error) {
    res.send("Error while fetching data");
  }
};

export { addBook, getBookByID, updateBook, deleteBook, searchBook, getBooks };
