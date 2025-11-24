import React from "react";
import '../components/navbarmain.css'
import { Link } from "react-router-dom";

export default function NavbarMain() {
  return (
    <nav className="navbar">
      <div className="logo">
      
        <h1>📚SGB</h1>
      </div>
      <div className="nav-buttons">
        <Link to="/Login" className="btn">Iniciar Sesion</Link>
        <Link to="/Signup" className="btn">Crear Cuenta</Link>

      </div>
    </nav>
  );
}
