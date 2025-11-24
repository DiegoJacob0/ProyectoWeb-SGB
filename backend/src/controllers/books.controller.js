import axios from "axios";

export const searchBooks = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Ingrese término de búsqueda" });
    }

    const response = await axios.get(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(q)}`
    );

    const books = response.data.docs.slice(0, 20).map(item => ({
      openLibraryId: item.key,
      title: item.title || "Sin título",
      authors: item.author_name || [],
      coverUrl: item.cover_i
        ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
        : "https://via.placeholder.com/120x180",
      firstPublishYear: item.first_publish_year || "N/A"
    }));

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar libros" });
  }
};
