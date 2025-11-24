// Aquí agregaré placeholders a cada input
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const Signup = () => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [genero, setGenero] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const navigate = useNavigate();

  const validarEmail = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const validarTelefono = (tel) => {
    const regex = /^[0-9]+$/;
    return regex.test(tel);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarEmail(email)) {
      alert("El correo no es válido. Debe incluir '@' y un formato válido.");
      return;
    }

    if (telefono && !validarTelefono(telefono)) {
      alert("El teléfono solo debe contener números.");
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        nombres,
        apellidos,
        nickname,
        email,
        password,
        telefono,
        genero,
        fechaNacimiento
      });

      alert(res.data.message);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      navigate('/login');

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error al crear cuenta');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-header">
        <div className="brand">📚SGB</div>
      </div>

      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Crear cuenta</h2>

          {/* Nombres */}
          <div className="form-field">
            <label>Nombres</label>
            <input placeholder="Ingresa tus nombres" value={nombres} onChange={e => setNombres(e.target.value)} required />
          </div>

          {/* Apellidos */}
          <div className="form-field">
            <label>Apellidos</label>
            <input placeholder="Ingresa tus apellidos" value={apellidos} onChange={e => setApellidos(e.target.value)} required />
          </div>

          {/* Nickname */}
          <div className="form-field">
            <label>Nombre de usuario (Nickname)</label>
            <input placeholder="Ej: Juan_23" value={nickname} onChange={e => setNickname(e.target.value)} required />
          </div>

          {/* Correo */}
          <div className="form-field">
            <label>Correo electrónico</label>
            <input placeholder="ejemplo@correo.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          {/* Contraseña */}
          <div className="form-field">
            <label>Contraseña</label>
            <input
              type={mostrarPassword ? 'text' : 'password'}
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirmar contraseña */}
          <div className="form-field">
            <label>Confirmar contraseña</label>
            <input
              type={mostrarPassword ? 'text' : 'password'}
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="button" 
            onClick={() => setMostrarPassword(!mostrarPassword)} 
            className="show-btn"
          >
            {mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          </button>

          {/* Teléfono */}
          <div className="form-field">
            <label>Teléfono</label>
            <input
              placeholder="Ej: 987654321"
              value={telefono}
              onChange={e => {
                const valor = e.target.value;
                if (valor === '' || /^[0-9]+$/.test(valor)) {
                  setTelefono(valor);
                }
              }}
            />
          </div>

          {/* Género */}
          <div className="form-field">
            <label>Género</label>
            <select value={genero} onChange={e => setGenero(e.target.value)}>
              <option value="">Seleccione una opción</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Fecha de nacimiento */}
          <div className="form-field">
            <label>Fecha de nacimiento</label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={e => setFechaNacimiento(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="primary-btn">Crear cuenta</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
