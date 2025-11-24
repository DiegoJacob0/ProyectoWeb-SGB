import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './settings.css';

const Settings = ({ user: userProp }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userProp) {
      setUser(userProp);
      localStorage.setItem('miCuenta', JSON.stringify(userProp));
      return;
    }

    const stored = localStorage.getItem('miCuenta');
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setUser(u);
      } catch {
        setUser(null);
      }
    } else {
      const demo = {
        nombreCompleto: 'Nombre Completo',
        usuario: 'usuario01',
        correo: 'usuario@example.com',
        oficio: 'estudiante',
      };
      setUser(demo);
    }
  }, [userProp]);

  if (!user)
    return (
      <div className="page-wrap">
        <div className="settings-container"><p>Cargando...</p></div>
      </div>
    );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("miCuenta");
    localStorage.removeItem("user");
    alert("Sesión cerrada");
    window.location.href = "/login";
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("¿Seguro que quieres eliminar tu cuenta?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("No estás autenticado");

      const res = await axios.delete("http://localhost:5000/api/auth/delete", {
        headers: { Authorization: `Bearer ${token}` }
      });

      localStorage.clear();

      alert(res.data?.message || "Tu cuenta ha sido eliminada.");
      window.location.href = "/signup";
    } catch (error) {
      alert(error.response?.data?.message || "Error al eliminar cuenta");
    }
  };

  return (
    <div className="page-wrap">
      <div className="settings-container">
        <h1 className="settings-title">Configuración</h1>


        <div className="extra-actions">
          <button
            type="button"
            className="help-btn"
            onClick={() => (window.location.href = "/help")}
          >
            Ayuda y asistencia
          </button>

          <button type="button" className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>

          <button type="button" className="delete-btn" onClick={handleDeleteAccount}>
            Eliminar cuenta
          </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;
