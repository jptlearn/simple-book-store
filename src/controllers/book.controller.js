import bookModel from "../models/book.model.js";


const addBook = async (req, res) => {
  try {
    const image = req.file.filename;
    const { name, author, genre, description } = req.body;
    await bookModel.create({
      name,
      author,
      genre,
      description,
      image: image
    });
    res.json({ success: true, message: "Book added successfully" });
  } catch (error) {
    console.error("Error while adding book", error);
  }
}

const getBookByID = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const book = await bookModel.findByPk(id)
      res.json({ success: true, message: book })
    } else {
      res.json({ success: false, message: "Id is required." })
    }
  } catch (error) {
    console.log("error while fetching book: ", error);
  }
}

export { addBook, getBookByID }