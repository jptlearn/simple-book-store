import React, { useEffect, useState } from "react";
import api from "../api/config.js";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]); // Initialize with empty array
  const [tempBookList, setTempBookList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get("/book");
        const books = response.data.data || [];
        setBookList(books);
        setTempBookList(books);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again later.");
        setBookList([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBook();
  }, []);

  useEffect(() => {
    async function searchBooks() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get(`/book/search/all?q=${searchText}`);
        setBookList(response.data.data || []);
      } catch (error) {
        console.error("Error searching books:", error);
        setError("Failed to search books. Please try again later.");
        setBookList([]);
      } finally {
        setIsLoading(false);
      }
    }
    if (searchText) searchBooks();
    else setBookList(tempBookList);
  }, [searchText, tempBookList]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        <input
          type="text"
          placeholder="Search books..."
          style={{
            width: "50%",
            padding: "12px 20px",
            margin: "8px 0",
            border: "2px solid #ddd",
            borderRadius: "25px",
            fontSize: "16px",
            outline: "none",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={(e) => (e.target.style.border = "2px solid #007bff")}
          onBlur={(e) => (e.target.style.border = "2px solid #ddd")}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <div style={{ padding: "20px", textAlign: "center" }}>
            Loading books...
          </div>
        ) : error ? (
          <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
            {error}
          </div>
        ) : bookList.length > 0 ? (
          bookList.map((book, index) => (
            <div
              onClick={() =>
                navigate("/explore", {
                  state: {
                    book,
                  },
                })
              }
              key={index}
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
                }}
                src={book.image.includes('http') ? book.image : `/uploads/${book.image}`}
                alt={book.name}
              />
              <br />
              {book.name}
            </div>
          ))
        ) : (
          <div>No Books Found</div>
        )}
      </div>
    </>
  );
};

export default HomePage;
