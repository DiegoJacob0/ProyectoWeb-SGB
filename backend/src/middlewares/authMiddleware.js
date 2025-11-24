import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Acceso denegado. Falta token" });

  try {
    const tokenVerified = token.replace("Bearer ", "");
    const decoded = jwt.verify(tokenVerified, "secret123");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
