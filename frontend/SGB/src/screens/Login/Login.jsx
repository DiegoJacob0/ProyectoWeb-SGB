import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Login/Login.css';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Completa todos los campos");
    
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      login(res.data.user, res.data.token); //Guarda en contexto y localStorage

      alert(res.data.message);
      navigate('/menu');

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <div className="brand">📚SGB</div>
      </header>

      <main className="login-container">
        <section className="card">
          <h2 className="card-title">Iniciar sesión</h2>
          <h1 className="welcome-title">Bienvenido Lector</h1>

          <form onSubmit={onSubmit} className="form">
            <div className="field">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>

            <div className="field">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Iniciando..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="signup">
            ¿No tienes cuenta?{" "}
            <span
              className="link-disabled"
              style={{ color: "#007bff", cursor: "pointer" }}
              onClick={() => navigate('/signup')} 
            >
              Crea una cuenta
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
