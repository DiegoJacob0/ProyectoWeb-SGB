import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Reservation/Reservation.css';

const Reservation = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchReservations = async () => {
      if (!token) return;
      try {
        const res = await axios.get('http://localhost:5000/api/books/my-reservations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReservas(res.data);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Error al cargar reservas");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [token]);

  // Función para cancelar reserva
  const handleCancelReservation = async (book) => {
    if (!token) return alert("Debes iniciar sesión");

    try {
      const res = await axios.post(
        'http://localhost:5000/api/books/cancel-reservation',
        { openLibraryId: book.openLibraryId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message);

      // Actualizar el estado local eliminando el libro cancelado
      setReservas((prev) => prev.filter((b) => b.openLibraryId !== book.openLibraryId));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error al cancelar la reserva");
    }
  };

  return (
    <div className="reservation-page">
      <main className="reservation-main">
        <header className="header">
          <h1 className="titulo">Mis Reservas</h1>
        </header>

        <section className="contenido">
          {loading ? (
            <p>Cargando reservas...</p>
          ) : reservas.length === 0 ? (
            <div className="placeholder">Aún no tienes libros reservados.</div>
          ) : (
            <div className="cards-container">
              {reservas.map((book) => (
                <div key={book.openLibraryId} className="book-card">
                  <img
                    src={book.coverUrl || "https://via.placeholder.com/120x180?text=No+Image"}
                    alt={book.title}
                    className="book-img"
                  />
                  <h3>{book.title}</h3>
                  <p>{book.authors?.join(", ") || "Desconocido"}</p>
                  <p>{book.firstPublishYear || "N/A"}</p>
                  <button
                    className="btn-cancel"
                    onClick={() => handleCancelReservation(book)}
                  >
                    Cancelar reserva
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Reservation;
