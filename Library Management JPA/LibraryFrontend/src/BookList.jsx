import React, { useEffect, useState } from "react";

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
    return <div className="text-center mt-8 text-blue-600">Loading books...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">📚 Book List</h1>
      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-2xl">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 border-b text-left text-gray-700">ID</th>
                <th className="px-6 py-3 border-b text-left text-gray-700">Book ID</th>
                <th className="px-6 py-3 border-b text-left text-gray-700">Name</th>
                <th className="px-6 py-3 border-b text-left text-gray-700">Author</th>
                <th className="px-6 py-3 border-b text-left text-gray-700">Price</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 border-b">{book.id}</td>
                  <td className="px-6 py-3 border-b">{book.book_id}</td>
                  <td className="px-6 py-3 border-b">{book.name}</td>
                  <td className="px-6 py-3 border-b">{book.author}</td>
                  <td className="px-6 py-3 border-b">₹{book.price}</td>
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
