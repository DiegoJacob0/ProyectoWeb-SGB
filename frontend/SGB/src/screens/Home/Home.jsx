import React from "react";
import { motion } from "framer-motion";
import "../Home/Main.css";

export default function Home() {
  return (
    <main className="main-container">

      {/* HERO */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-text">
          <h2>Bienvenido a SGB</h2>
          <p>Sistema de Gestión Bibliotecario</p>
          <p>Explora, reserva y disfruta de nuestra colección de libros digitales.</p>
          <p>
            En SGB creemos que la lectura es una puerta al conocimiento, la inspiración y la creatividad.
            Nuestra plataforma está diseñada para ofrecerte una experiencia cómoda y accesible, permitiéndote
            conectarte con miles de historias y recursos educativos al alcance de un clic.
          </p>
        </div>

        <motion.div
          className="hero-image"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/060/515/732/non_2x/little-boy-reading-a-book-free-png.png"
            alt="Niño leyendo"
          />
        </motion.div>
      </motion.section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h3>¿Por qué usar SGB?</h3>
        <p className="section-description">
          Nuestro sistema está diseñado para ofrecer una experiencia intuitiva, completa y adaptada para todos los lectores,
          sin importar su edad o intereses. Descubre cómo SGB puede mejorar tu forma de acceder a la lectura.
        </p>

        <div className="features-grid">
          {[
            { icon: "📚", title: "Gran variedad", desc: "Miles de libros de todas las categorías." },
            { icon: "⚡", title: "Rápido y sencillo", desc: "Busca y reserva libros en segundos." },
            { icon: "🔥", title: "Actualizado", desc: "Contenido nuevo cada semana." },
            { icon: "💻", title: "Disponible 24/7", desc: "Accede desde cualquier dispositivo." }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="extra-text">
          Con SGB, podrás descubrir tesoros literarios, autores nuevos y clásicos que han marcado generaciones.
          Nuestro catálogo en constante crecimiento se adapta a los gustos de todo tipo de lectores, desde aficionados
          a la fantasía, hasta estudiantes de ciencias y profesionales que buscan información precisa y confiable.
        </p>
      </section>

      {/* BOOKS SECTION */}
      <motion.section
        className="books-section"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h3>Lo que podrás encontrar</h3>
        <p>
          Desde clásicos de la literatura hasta textos científicos, novelas modernas y contenido educativo. Nuestra
          colección está pensada para acompañarte en tu aprendizaje, entretenimiento y desarrollo personal.
        </p>

        <div className="book-gallery">
          {[
            "https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2016/07/20201800/mejores-libros-Don-Quijote-sf.jpg",
            "https://cdn.culturagenial.com/es/imagenes/el-principito-portada-cke.jpg?class=article",
            "https://www.lascosasquenoshacenfelices.com/wp-content/uploads/2016/09/mago-de-oz.jpg"
          ].map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`Libro ${i + 1}`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          ))}
        </div>

        <p className="extra-text">
          Cada libro tiene su historia, y cada lector encuentra en nuestras páginas un universo distinto. Ya sea que estés
          buscando aprender algo nuevo, revivir un clásico o simplemente relajarte con una buena lectura, SGB es tu lugar.
        </p>
      </motion.section>

      {/* TESTIMONIOS */}
      <section className="testimonials-section">
        <h3>Opiniones de nuestros lectores</h3>
        <p className="section-description">
          La comunidad de SGB crece cada día. Aquí algunas opiniones de quienes ya disfrutan la plataforma:
        </p>

        <div className="testimonials-grid">
          {[
            { name: "Ana Torres", msg: "Una plataforma increíble, encontré libros que buscaba hace años." },
            { name: "Luis Pérez", msg: "Reservar es facilísimo, ideal para mis tareas." },
            { name: "María López", msg: "Me encanta la variedad de libros disponibles." }
          ].map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card"
              whileHover={{ scale: 1.05 }}
            >
              <p className="quote">“{t.msg}”</p>
              <span className="author">— {t.name}</span>
            </motion.div>
          ))}
        </div>

        <p className="extra-text">
          Tus opiniones nos ayudan a seguir creciendo y mejorando. Nuestro objetivo es construir un espacio donde cada
          lector se sienta acompañado, motivado y con herramientas que faciliten su experiencia literaria.
        </p>
      </section>

      {/* CTA FINAL */}
      <section className="cta-section">
        <h2>¿Listo para empezar a leer?</h2>
        <p>Explora nuestra colección y reserva tu próximo libro favorito.</p>
        <p className="extra-text">
          El mundo de la lectura está a solo un clic. Sumérgete en historias, aprende algo nuevo cada día y deja que
          SGB sea tu portal a un universo ilimitado de conocimiento.
        </p>
        <a className="cta-button" href="/libros">Explorar libros</a>
      </section>

    </main>
  );
}
