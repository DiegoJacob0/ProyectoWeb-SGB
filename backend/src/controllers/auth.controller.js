// controllers/authController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      nickname,
      telefono,
      genero,
      fechaNacimiento,
      email,
      password
    } = req.body;

    if (!nombres || !apellidos || !nickname || !email || !password) {
      return res.status(400).json({ message: "Todos los campos obligatorios deben completarse" });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const nicknameExists = await User.findOne({ nickname });
    if (nicknameExists) {
      return res.status(400).json({ message: "El nickname ya está en uso" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nombres,
      apellidos,
      nickname,
      telefono,
      genero,
      fechaNacimiento,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        id: newUser._id,
        nombres: newUser.nombres,
        apellidos: newUser.apellidos,
        nickname: newUser.nickname,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("Error en signup:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
