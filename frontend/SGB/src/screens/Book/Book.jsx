import React, { useState } from "react";
import axios from "axios";
import "../Book/Book.css";

const Book = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/books/search?q=${query}`
      );
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al buscar libros");
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (book) => {
    if (!token) return alert("Debes iniciar sesión para reservar");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/books/reserve`,
        {
          openLibraryId: book.openLibraryId,
          title: book.title,
          authors: book.authors,
          coverUrl: book.coverUrl,
          firstPublishYear: book.firstPublishYear,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message);

      // Actualiza el estado local para reflejar que el libro ya no está disponible
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b.openLibraryId === book.openLibraryId ? { ...b, reserved: true } : b
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error al reservar libro");
    }
  };

  return (
    <div className="book-page">
      <main className="book-main">
        <header className="header">
          <h1 className="titulo">Buscar libro</h1>
        </header>

        <section className="contenido">
          <div className="buscador">
            <input
              type="text"
              placeholder="Escribe para buscar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-buscador"
            />
            <button className="btn-search" onClick={handleSearch}>
              Buscar
            </button>
          </div>

          <section className="resultados">
            {loading ? (
              <p>Cargando...</p>
            ) : books.length === 0 ? (
              <h2 className="subtitulo">Resultados...</h2>
            ) : (
              <div className="cards-container">
                {books.map((book) => (
                  <div key={book.openLibraryId} className="book-card">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="book-img"
                    />
                    <h3>{book.title}</h3>
                    <p>{book.authors.join(", ")}</p>
                    <button
                      className="btn-reserve"
                      onClick={() => handleReserve(book)}
                      disabled={book.reserved} // evita reservar dos veces
                    >
                      {book.reserved ? "Reservado" : "Reservar"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
};

export default Book;
