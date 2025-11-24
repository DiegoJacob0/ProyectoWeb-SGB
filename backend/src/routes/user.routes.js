import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile", verifyToken, async (req, res) => {
  res.json({
    message: "Perfil cargado",
    user: req.user,
  });
});

export default router;
