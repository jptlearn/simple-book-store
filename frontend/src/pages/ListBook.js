import React, { useEffect, useState } from "react";
import api from "../api/config";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListBook = () => {
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    async function getBooks() {
      const response = await api.get("/book");
      console.log(response.data);
      setBookList(response.data);
    }
    getBooks();
  }, []);

  const deleteBook = async (id, idx) => {
    const res = window.confirm("Do you want to delete?");
    if (res) {
      try {
        const response = await api.delete(`/book/${id}`);
        console.log(response.data);
        if (response.data.success) {
          const newBookList = bookList.filter((book, index) => index !== idx);
          setBookList(newBookList);
          toast.success("Book deleted successfully!");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <center>
      <ToastContainer />
      {bookList.length > 0
        ? bookList.map((book, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  boxShadow: "0px 0px 5px #ccc",
                  padding: "10px",
                  margin: "10px",
                  width: "45%",
                  textAlign: "start",
                  justifyContent: "space-between",
                  marginTop: "30px",
                }}
              >
                {book.name}
                <FaTrashAlt
                  color="red"
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => deleteBook(book.id, index)}
                />
              </div>
            );
          })
        : "No Books Found"}
    </center>
  );
};

export default ListBook;
