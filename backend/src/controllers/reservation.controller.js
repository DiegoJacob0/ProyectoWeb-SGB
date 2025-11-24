import Book from "../models/Book.js";

// Reservar libro (máximo 5)
export const reserveBook = async (req, res) => {
  try {
    const { openLibraryId, title, authors, coverUrl, firstPublishYear } = req.body;
    const userId = req.user.id;

    const count = await Book.countDocuments({ reservedBy: userId });
    if (count >= 5) {
      return res.status(400).json({ message: "Máximo permitido: 5 reservas" });
    }

    let book = await Book.findOne({ openLibraryId });

    if (!book) {
      book = await Book.create({
        openLibraryId,
        title,
        authors,
        coverUrl,
        firstPublishYear,
        available: false,
        reservedBy: userId
      });

      return res.json({ message: "Libro reservado", book });
    }

    if (!book.available) {
      return res.status(400).json({ message: "Libro ya está reservado" });
    }

    book.available = false;
    book.reservedBy = userId;
    await book.save();

    res.json({ message: "Libro reservado correctamente", book });

  } catch (error) {
    console.error("Error reserva:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener reservas del usuario
export const getMyReservations = async (req, res) => {
  try {
    const books = await Book.find({ reservedBy: req.user.id });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas" });
  }
};

// Cancelar reserva
export const cancelReservation = async (req, res) => {
  try {
    const { openLibraryId } = req.body;
    const userId = req.user.id;

    const book = await Book.findOne({ openLibraryId, reservedBy: userId });

    if (!book) {
      return res.status(404).json({ message: "No tienes esta reserva" });
    }

    book.available = true;
    book.reservedBy = null;
    await book.save();

    res.json({ message: "Reserva cancelada", book });

  } catch (error) {
    res.status(500).json({ message: "Error al cancelar" });
  }
};
