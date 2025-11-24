import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, nickname: user.nickname },
      "mi_secreto",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id,
        nombres: user.nombres,
        nickname: user.nickname,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
