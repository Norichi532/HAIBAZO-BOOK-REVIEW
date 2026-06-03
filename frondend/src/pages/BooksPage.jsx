import { useEffect, useState } from "react";
import api from "../api";

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");

  const [errors, setErrors] = useState({});
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [page, setPage] = useState(1);

  const pageSize = 5;

  useEffect(() => {
    async function loadData() {
      const authorsRes = await api.get("/authors");
      const booksRes = await api.get("/books");

      setAuthors(authorsRes.data);
      setBooks(booksRes.data);
    }

    loadData();
  }, []);

  async function fetchData() {
    const authorsRes = await api.get("/authors");
    const booksRes = await api.get("/books");

    setAuthors(authorsRes.data);
    setBooks(booksRes.data);
  }

  const currentBooks = books.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(books.length / pageSize);

  const handleCreate = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Please enter name";
    }

    if (!authorId) {
      newErrors.authorId = "Please select author";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await api.post("/books", {
      title,
      author_id: Number(authorId),
    });

    setTitle("");
    setAuthorId("");
    setErrors({});
    setPage(1);
    fetchData();
  };

  const handleUpdate = async () => {
    if (!editingBook.title.trim() || !editingBook.author_id) return;

    await api.put(`/books/${editingBook.id}`, {
      title: editingBook.title,
      author_id: Number(editingBook.author_id),
    });

    setEditingBook(null);
    fetchData();
  };

  const handleDelete = async () => {
    await api.delete(`/books/${deletingBook.id}`);
    setDeletingBook(null);
    setPage(1);
    fetchData();
  };

  return (
    <section className="card">
      <h2>Books Create</h2>

      <form onSubmit={handleCreate}>
        <div className="form-row">
          <div className="form-field">
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
            />
            {errors.title && <p className="error">* {errors.title}</p>}
          </div>

          <div className="form-field">
            <label>Author</label>
            <select
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
            >
              <option value="">Select author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
            {errors.authorId && <p className="error">* {errors.authorId}</p>}
          </div>

          <button type="submit">Save</button>
        </div>
      </form>

      <h2>Books List</h2>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {currentBooks.map((book, index) => (
            <tr key={book.id}>
              <td>{(page - 1) * pageSize + index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author_name}</td>
              <td>
                <button onClick={() => setEditingBook({ ...book })}>
                  Update
                </button>
              </td>
              <td>
                <button
                  className="danger"
                  onClick={() => setDeletingBook(book)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {currentBooks.length === 0 && (
            <tr>
              <td colSpan="5">No books found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={page === index + 1 ? "active" : ""}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {editingBook && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Book</h2>

            <label>Title</label>
            <input
              value={editingBook.title}
              onChange={(e) =>
                setEditingBook({
                  ...editingBook,
                  title: e.target.value,
                })
              }
            />

            <label>Author</label>
            <select
              value={editingBook.author_id}
              onChange={(e) =>
                setEditingBook({
                  ...editingBook,
                  author_id: e.target.value,
                })
              }
            >
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>

            <div className="modal-actions">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingBook(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deletingBook && (
        <div className="modal">
          <div className="modal-content">
            <h2>Delete Book</h2>
            <p>Are you sure you want to delete this book?</p>

            <div className="modal-actions">
              <button className="danger" onClick={handleDelete}>
                Delete
              </button>
              <button onClick={() => setDeletingBook(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default BooksPage;