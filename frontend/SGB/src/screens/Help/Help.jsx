import React from "react";
import "./help.css";

export default function Help() {
  return (
    <div className="help-page">
      <div className="help-card">
        <h1 className="help-title">Ayuda y Asistencia</h1>

        <section className="help-section">
          <h2>Contactos de Soporte</h2>
          <p><strong>Email:</strong> sgb@edu.sv</p>
          <p><strong>Teléfono:</strong> +503 12345678</p>
          <p><strong>Horario:</strong> Lunes a Viernes · 8:00 AM - 5:00 PM</p>
        </section>

        <section className="help-section">
          <h2>Enviar Comentarios</h2>
          <textarea
            placeholder="Escribe aquí tus sugerencias o comentarios..."
            className="help-textarea"
          ></textarea>

          <button className="help-btn">Enviar Feedback</button>
        </section>
      </div>
    </div>
  );
}
