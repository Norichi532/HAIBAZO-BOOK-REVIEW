import { useEffect, useState } from "react";
import api from "../api";

function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [deletingAuthor, setDeletingAuthor] = useState(null);
  const [page, setPage] = useState(1);

  const pageSize = 5;

  useEffect(() => {
    async function loadAuthors() {
      const res = await api.get("/authors");
      setAuthors(res.data);
    }

    loadAuthors();
  }, []);

  async function fetchAuthors() {
    const res = await api.get("/authors");
    setAuthors(res.data);
  }

  const currentAuthors = authors.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(authors.length / pageSize);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter name");
      return;
    }

    await api.post("/authors", { name });
    setName("");
    setError("");
    setPage(1);
    fetchAuthors();
  };

  const handleUpdate = async () => {
    if (!editingAuthor.name.trim()) return;

    await api.put(`/authors/${editingAuthor.id}`, {
      name: editingAuthor.name,
    });

    setEditingAuthor(null);
    fetchAuthors();
  };

  const handleDelete = async () => {
    await api.delete(`/authors/${deletingAuthor.id}`);
    setDeletingAuthor(null);
    setPage(1);
    fetchAuthors();
  };

  return (
    <section className="card">
      <h2>Authors Create</h2>

      <form onSubmit={handleCreate}>
        <div className="form-row">
          <div className="form-field">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter author name"
            />
            {error && <p className="error">* {error}</p>}
          </div>

          <button type="submit">Save</button>
        </div>
      </form>

      <h2>Authors List</h2>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {currentAuthors.map((author, index) => (
            <tr key={author.id}>
              <td>{(page - 1) * pageSize + index + 1}</td>
              <td>{author.name}</td>
              <td>
                <button onClick={() => setEditingAuthor({ ...author })}>
                  Update
                </button>
              </td>
              <td>
                <button
                  className="danger"
                  onClick={() => setDeletingAuthor(author)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {currentAuthors.length === 0 && (
            <tr>
              <td colSpan="4">No authors found</td>
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

      {editingAuthor && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Author</h2>

            <label>Name</label>
            <input
              value={editingAuthor.name}
              onChange={(e) =>
                setEditingAuthor({
                  ...editingAuthor,
                  name: e.target.value,
                })
              }
            />

            <div className="modal-actions">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingAuthor(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deletingAuthor && (
        <div className="modal">
          <div className="modal-content">
            <h2>Delete Author</h2>
            <p>Are you sure you want to delete this author?</p>

            <div className="modal-actions">
              <button className="danger" onClick={handleDelete}>
                Delete
              </button>
              <button onClick={() => setDeletingAuthor(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AuthorsPage;