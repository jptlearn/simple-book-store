import React, { useEffect, useState } from "react";
import api from "../api/config.js";

const HomePage = () => {
  const [bookList, setBookList] = useState([]); // Initialize with empty array

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await api.get("/book");
        // console.log(response.data);
        // Check if response.data is array, if not get its values
        const books = Array.isArray(response.data)
          ? response.data
          : Object.values(response.data);
        // console.log(books);
        setBookList(books);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBookList([]);
      }
    }
    fetchBook();
  }, []);

  return (
    <>
      <center><input type="text" placeholder="search books .... /></center>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {bookList.map((book, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                boxShadow: "0px 0px 5px #ccc",
                marginLeft: "20px",
                marginTop: "20px",
              }}
            >
              <img
                style={{
                  height: "250px",
                  width: "250px",
                  objectFit: "contain",
                }}
                src={book.image}
                alt="book"
              />
              <br />
              {book.name}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
