import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = (e) => {
    e.stopPropagation();
    logout();
    navigate("/");
  };

  return (
    <header
      style={{
        backgroundColor: "#111",
        color: "white",
        padding: "15px 25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Логотип */}
      <Link
        to="/"
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#f5c518",
          textDecoration: "none",
        }}
      >
        Aurora<span style={{ color: "white" }}>Motors</span>
      </Link>

      {/* Бургер для мобильных */}
      <div
        onClick={toggleMenu}
        style={{
          cursor: "pointer",
          fontSize: "1.8rem",
          display: "none",
        }}
        className="menu-toggle"
      >
        ☰
      </div>

      {/* Навигация */}
      <nav
        className={`nav-links ${menuOpen ? "open" : ""}`}
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
        }}
      >
        <Link to="/" onClick={closeMenu} style={linkStyle}>
          Главная
        </Link>
        <Link to="/catalog" onClick={closeMenu} style={linkStyle}>
          Каталог
        </Link>
        <Link to="/about" onClick={closeMenu} style={linkStyle}>
          О нас
        </Link>
        <Link to="/contact" onClick={closeMenu} style={linkStyle}>
          Контакты
        </Link>

        {!user ? (
          <Link
            to="/login"
            onClick={closeMenu}
            style={{
              ...linkStyle,
              backgroundColor: "#f5c518",
              color: "#111",
              padding: "8px 16px",
              borderRadius: "25px",
              fontWeight: "bold",
            }}
          >
            Вход
          </Link>
        ) : (
          <div
            onClick={() => navigate("/profile")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "25px",
              backgroundColor: "#222",
            }}
          >
            {/* Аватарка с первой буквой имени */}
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#f5c518",
                color: "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "0.9rem",
              }}
            >
              {user.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <span style={{ color: "white", fontWeight: "bold" }}>{user.name}</span>
            <button
              onClick={handleLogout}
              style={{
                marginLeft: "10px",
                backgroundColor: "#f00",
                color: "white",
                border: "none",
                padding: "4px 10px",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
            >
              Выход
            </button>
          </div>
        )}
      </nav>

      {/* CSS адаптивности */}
      <style>
        {`
          @media (max-width: 768px) {
            .menu-toggle {
              display: block;
            }

            .nav-links {
              position: absolute;
              top: 60px;
              left: 0;
              width: 100%;
              flex-direction: column;
              background-color: #111;
              display: none;
              text-align: center;
              padding: 20px 0;
            }

            .nav-links.open {
              display: flex;
            }

            .nav-links a {
              padding: 10px 0;
            }
          }
        `}
      </style>
    </header>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "1rem",
  transition: "color 0.3s",
};
