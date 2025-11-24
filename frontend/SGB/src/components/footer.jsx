import React from "react";
import '../components/footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h2>SGB</h2>
      </div>

      <div className="footer-center">
        <p>Síguenos en nuestras redes sociales</p>
        <ul>
          <li>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              X
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-right">
        <p>San Salvador, El Salvador</p>
        <p>+503 12345678</p>
        <p>sgb@edu.sv</p>
      </div>
    </footer>
  );
}
