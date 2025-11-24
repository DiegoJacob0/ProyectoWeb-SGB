import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import { AuthContext } from "../../context/AuthContext";

export default function Menu() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="menu-container">
      <div className="overlay">

        {/* Card Glass */}
        <div className="menu-card">
          <h1 className="menu-title">
            Bienvenido {user?.nickname || user?.nombres || ":D"}
          </h1>

          <div className="menu-buttons">
            <button className="menu-btn" onClick={() => navigate("/libros")}>
              Buscar Libro
            </button>

            <button className="menu-btn" onClick={() => navigate("/reservas")}>
              Reservar Libro
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
