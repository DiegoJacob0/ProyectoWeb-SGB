import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  telefono: { type: String, required: false },
  genero: { type: String, required: false },
  fechaNacimiento: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
