import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Footer from "./components/footer";
import NavbarMain from "./components/navbarmain";
import NavbarMenu from "./components/navbarmenu";

import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import Menu from "./screens/Menu/Menu";
import Book from "./screens/Book/Book";
import Reservation from "./screens/Reservation/Reservation";
import Account from "./screens/Account/Account";
import Settings from "./screens/Settings/Settings";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Help from "./screens/Help/help";

function AppContent() {
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();

  const showMainNavbar = pathname === "/";
  const hideNavAndFooter = pathname === "/login" || pathname === "/signup";
  const showNewNavbar = ["/menu", "/libros", "/reservas", "/micuenta", "/configuracion", "/help"].includes(pathname);

  return (
    <>
      {!hideNavAndFooter && (
        <>
          {showMainNavbar && <NavbarMain />}
          {showNewNavbar && <NavbarMenu />}
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/menu" element={<PrivateRoute><Menu /></PrivateRoute>} />
        <Route path="/libros" element={<PrivateRoute><Book /></PrivateRoute>} />
        <Route path="/reservas" element={<PrivateRoute><Reservation /></PrivateRoute>} />
        <Route path="/micuenta" element={<PrivateRoute><Account /></PrivateRoute>} />
        <Route path="/configuracion" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/help" element={<PrivateRoute><Help /></PrivateRoute>} />

      </Routes>

      {!hideNavAndFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
