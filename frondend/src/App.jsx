import { useState } from "react";
import AuthorsPage from "./pages/AuthorsPage.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import ReviewsPage from "./pages/ReviewsPage.jsx";
import "./App.css";

function App() {
  const [page, setPage] = useState("authors");

  return (
    <div className="App">
      <header className="topbar">
        <h1>HAIBAZO Book</h1>

        <nav>
          <button onClick={() => setPage("authors")}>Authors</button>
          <button onClick={() => setPage("books")}>Books</button>
          <button onClick={() => setPage("reviews")}>Reviews</button>
        </nav>
      </header>

      <main>
        {page === "authors" && <AuthorsPage />}
        {page === "books" && <BooksPage />}
        {page === "reviews" && <ReviewsPage />}
      </main>
    </div>
  );
}

export default App;