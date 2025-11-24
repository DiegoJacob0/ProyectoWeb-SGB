// routes/reservation.routes.js
import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { reserveBook, getMyReservations, cancelReservation } from "../controllers/reservation.controller.js";

const router = express.Router();

// Reservar libro
router.post("/reserve", verifyToken, reserveBook);

// Listar mis reservas
router.get("/my", verifyToken, getMyReservations);

// Cancelar reserva
router.post("/cancel", verifyToken, cancelReservation);

export default router;
