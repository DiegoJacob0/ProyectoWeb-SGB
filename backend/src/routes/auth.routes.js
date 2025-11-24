import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// SIGNUP usando el controlador
router.post("/signup", signup);

// Obtener todos los usuarios
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json({
      message: "Lista de usuarios registrados",
      total: users.length,
      users
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

// Eliminar cuenta
router.delete("/delete", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "Cuenta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar cuenta:", error);
    res.status(500).json({ message: "Error al eliminar cuenta" });
  }
});

export default router;
