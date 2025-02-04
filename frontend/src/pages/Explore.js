import React from "react";
import { useLocation } from "react-router-dom";

const Explore = () => {
  const book = useLocation().state.book;
  console.log(book);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
        boxShadow: "0px 0px 5px #ccc",
        marginLeft: "20px",
        marginTop: "20px",
        cursor: "pointer",
      }}
    >
      <img
        style={{
          height: "250px",
          width: "250px",
          objectFit: "contain",
          margin: "auto",
        }}
        src={book.image}
        alt="book"
      />
      <br />
      <h2 style={{ margin: "auto" }}>{book.name}</h2>
      <h3 style={{ color: "black", marginBottom: "8px" }}>Author</h3>
      {book.author}
      <br />
      <h3 style={{ color: "black", marginBottom: "8px" }}>Genre</h3>
      {book.genre}
      <br />
      <h3 style={{ color: "black", marginBottom: "8px" }}>Description</h3>
      {book.description}
    </div>
  );
};

export default Explore;
