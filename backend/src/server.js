import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

import { loginUser } from "./controllers/login.controller.js";
import userRoutes from "./routes/user.routes.js";
import booksRoutes from "./routes/books.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/sgb")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Error Mongo:", err));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/auth", loginUser);
app.use("/api/user", userRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/reservas", reservationRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
