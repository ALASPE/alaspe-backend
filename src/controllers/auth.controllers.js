import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/session.config.js";
import { Socios } from "../models/Socios.js";

export const loginSocio = async (req, res) => {
  try {
    const { dni, password } = req.body;

    const socio = await Socios.findOne({ where: { dni } });
    if (!socio)
      return res.status(400).json({ message: "DNI o contraseña inválidos." });

    const isMatch = await bcrypt.compare(password, socio.password);
    if (!isMatch)
      return res.status(400).json({ message: "DNI o contraseña inválidos." });

    const token = jwt.sign(
      { id: socio.cip, DNI: socio.dni},
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      // redirectUrl: socio.Rol === "admin" ? "/admin" : "/socio",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logoutSocio = (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Cierre de sesión exitoso." });
};

export const verifySession = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, SECRET_KEY, (err, socio) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    res.status(200).json({ message: `Hola, ${socio.dni}!`, socio });
  });
};
