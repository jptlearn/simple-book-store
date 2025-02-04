import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import "./assets/sass/main.scss";
import Explore from "./pages/Explore";
import ListBook from "./pages/ListBook";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
          <Route path="addBook" element={<AddBook />} />
          <Route path="listBook" element={<ListBook />} />
        </Route>
        <Route
          path="*"
          element={
            <div
              style={{
                color: "black",
                textAlign: "center",
                marginTop: "50px",
                fontSize: "24px",
              }}
            >
              (404)Page not found
            </div>
          }
        />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </Router>
  );
}

export default App;
