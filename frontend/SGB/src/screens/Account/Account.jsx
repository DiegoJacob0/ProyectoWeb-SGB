import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './account.css';

const Account = () => {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleDeletePhoto = () => {
    const updatedUser = { ...user, foto: null };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  if (!user) return (
    
    <div className="page-wrap">
      <div className="account-container">
        <p>Cargando información del usuario...</p>
      </div>
    </div>
  );

  return (
    <div className="page-wrap">
      <div className="account-container">

        {/* --- FOTO DE PERFIL + SUBIR + ELIMINAR --- */}
        <div className="account-profile">

          {/* Avatar */}
          <label
            htmlFor="avatar-upload"
            className="avatar-placeholder"
            style={{
              backgroundImage: user?.foto ? `url(${user.foto})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: user?.foto ? "transparent" : "#888",
              cursor: "pointer"
            }}
          >
            {!user?.foto && "👤"}
          </label>

          {/* Input para subir foto */}
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              const reader = new FileReader();
              reader.onload = () => {
                const updatedUser = { ...user, foto: reader.result };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
              };
              reader.readAsDataURL(file);
            }}
          />

          {/* Botón eliminar foto */}
          {user?.foto && (
            <button className="change-photo-btn" onClick={handleDeletePhoto}>
              Eliminar foto
            </button>
          )}
        </div>

        {/* --- DETALLES DE LA CUENTA --- */}
        <div className="account-details">
          <h1 className="account-title">Mi cuenta</h1>

          <div className="account-row">
            <span className="label">Nombre completo</span>
            <span className="value">{user.nombres} {user.apellidos}</span>
          </div>

          <div className="account-row">
            <span className="label">Nickname</span>
            <span className="value">{user.nickname}</span>
          </div>

          <div className="account-row">
            <span className="label">Correo</span>
            <span className="value">{user.email}</span>
          </div>

          <div className="account-reservas">
            <Link to="/reservas" className="reservas-link">Mis reservas</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Account;
