import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8001/getBooks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5 text-primary">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4 text-dark">📚 Book List</h2>

      {books.length === 0 ? (
        <p className="text-center text-muted">No books available.</p>
      ) : (
        <div className="table-responsive shadow-lg rounded-3">
          <table className="table table-striped table-hover align-middle text-center">
            <thead className="table-primary">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Book Name</th>
                <th scope="col">Author</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>₹{book.price}</td>
                  <td>
                    {/* <h1>${book.imagePath}</h1> */}
                    {book.imagePath ? (
                      <img
                        src={`http://localhost:8001${book.imagePath}`}
                        alt={book.name}
                        style={{
                          width: "80px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        }}
                      />
                    ) : (
                      <span className="text-muted">No image</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookList;
