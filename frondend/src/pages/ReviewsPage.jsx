import { useEffect, useState } from "react";
import api from "../api";

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [books, setBooks] = useState([]);

  const [bookId, setBookId] = useState("");
  const [review, setReview] = useState("");

  const [errors, setErrors] = useState({});
  const [editingReview, setEditingReview] = useState(null);
  const [deletingReview, setDeletingReview] = useState(null);
  const [page, setPage] = useState(1);

  const pageSize = 5;

  useEffect(() => {
    async function loadData() {
      const booksRes = await api.get("/books");
      const reviewsRes = await api.get("/reviews");

      setBooks(booksRes.data);
      setReviews(reviewsRes.data);
    }

    loadData();
  }, []);

  async function fetchData() {
    const booksRes = await api.get("/books");
    const reviewsRes = await api.get("/reviews");

    setBooks(booksRes.data);
    setReviews(reviewsRes.data);
  }

  const currentReviews = reviews.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(reviews.length / pageSize);

  const handleCreate = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!bookId) {
      newErrors.bookId = "Please select book";
    }

    if (!review.trim()) {
      newErrors.review = "Please enter review";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await api.post("/reviews", {
      book_id: Number(bookId),
      review,
    });

    setBookId("");
    setReview("");
    setErrors({});
    setPage(1);
    fetchData();
  };

  const handleUpdate = async () => {
    if (!editingReview.review.trim() || !editingReview.book_id) return;

    await api.put(`/reviews/${editingReview.id}`, {
      book_id: Number(editingReview.book_id),
      review: editingReview.review,
    });

    setEditingReview(null);
    fetchData();
  };

  const handleDelete = async () => {
    await api.delete(`/reviews/${deletingReview.id}`);
    setDeletingReview(null);
    setPage(1);
    fetchData();
  };

  return (
    <section className="card">
      <h2>Reviews Create</h2>

      <form onSubmit={handleCreate}>
        <div className="form-row">
          <div className="form-field">
            <label>Book</label>
            <select value={bookId} onChange={(e) => setBookId(e.target.value)}>
              <option value="">Select book</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
            {errors.bookId && <p className="error">* {errors.bookId}</p>}
          </div>

          <div className="form-field">
            <label>Review</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Enter review"
            />
            {errors.review && <p className="error">* {errors.review}</p>}
          </div>

          <button type="submit">Save</button>
        </div>
      </form>

      <h2>Reviews List</h2>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Book</th>
            <th>Author</th>
            <th>Review</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {currentReviews.map((item, index) => (
            <tr key={item.id}>
              <td>{(page - 1) * pageSize + index + 1}</td>
              <td>{item.book_title}</td>
              <td>{item.author_name}</td>
              <td>{item.review}</td>
              <td>
                <button onClick={() => setEditingReview({ ...item })}>
                  Update
                </button>
              </td>
              <td>
                <button
                  className="danger"
                  onClick={() => setDeletingReview(item)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {currentReviews.length === 0 && (
            <tr>
              <td colSpan="6">No reviews found</td>
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

      {editingReview && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Review</h2>

            <label>Book</label>
            <select
              value={editingReview.book_id}
              onChange={(e) =>
                setEditingReview({
                  ...editingReview,
                  book_id: e.target.value,
                })
              }
            >
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>

            <label>Review</label>
            <textarea
              value={editingReview.review}
              onChange={(e) =>
                setEditingReview({
                  ...editingReview,
                  review: e.target.value,
                })
              }
            />

            <div className="modal-actions">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingReview(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deletingReview && (
        <div className="modal">
          <div className="modal-content">
            <h2>Delete Review</h2>
            <p>Are you sure you want to delete this review?</p>

            <div className="modal-actions">
              <button className="danger" onClick={handleDelete}>
                Delete
              </button>
              <button onClick={() => setDeletingReview(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ReviewsPage;