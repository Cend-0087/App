import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    logout();
    navigate("/");
  };

  // Закрываем меню при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  return (
    <header className="header">
      {/* Логотип */}
      <Link to="/" className="logo">
        Kybrak<span className="logo-span">Motors</span>
      </Link>

      {/* Бургер для мобильных */}
      <div 
        className={`burger ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Навигация */}
      <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={closeMenu}>
          Главная
        </Link>
        <Link to="/catalog" className="nav-link" onClick={closeMenu}>
          Каталог
        </Link>
        <Link to="/about" className="nav-link" onClick={closeMenu}>
          О нас
        </Link>
        <Link to="/contact" className="nav-link" onClick={closeMenu}>
          Контакты
        </Link>

        {!user ? (
          <Link
            to="/login"
            className="nav-link login-button"
            onClick={closeMenu}
          >
            Вход
          </Link>
        ) : (
          <div className="user-menu" onClick={() => navigate("/profile")}>
            <div className="avatar">
              {user.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <span className="user-name">{user.name}</span>
            <button
              onClick={handleLogout}
              className="logout-button"
            >
              Выход
            </button>
          </div>
        )}
      </nav>

      {/* Все стили здесь */}
      <style>{`
        .header {
          background-color: #0e0e0ef2;
          color: white;
          padding: 15px 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo {
          font-size: clamp(1.2rem, 4vw, 1.5rem);
          font-weight: bold;
          color: #f5c518;
          text-decoration: none;
          white-space: nowrap;
          z-index: 1001;
        }

        .logo-span {
          color: white;
        }

        /* Бургер меню */
        .burger {
          width: 30px;
          height: 20px;
          position: relative;
          cursor: pointer;
          display: none;
          flex-direction: column;
          justify-content: space-between;
          z-index: 1001;
        }

        .burger span {
          width: 100%;
          height: 3px;
          background-color: white;
          transition: all 0.3s ease;
          border-radius: 3px;
        }

        .burger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .burger.open span:nth-child(2) {
          opacity: 0;
        }

        .burger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        /* Навигационное меню - по умолчанию для десктопа */
        .nav-menu {
          display: flex;
          gap: clamp(10px, 2vw, 25px);
          align-items: center;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-size: clamp(0.9rem, 3vw, 1rem);
          transition: color 0.3s;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: #f5c518;
        }

        .login-button {
          background-color: #f5c518;
          color: #111 !important;
          padding: 8px 16px;
          border-radius: 25px;
          font-weight: bold;
        }

        .login-button:hover {
          background-color: #e6b800;
          color: #111 !important;
        }

        /* Блок пользователя */
        .user-menu {
          display: flex;
          align-items: center;
          gap: clamp(5px, 1vw, 10px);
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 25px;
          background-color: #222;
        }

        .avatar {
          width: clamp(25px, 5vw, 30px);
          height: clamp(25px, 5vw, 30px);
          border-radius: 50%;
          background-color: #f5c518;
          color: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: clamp(0.8rem, 3vw, 0.9rem);
        }

        .user-name {
          color: white;
          font-weight: bold;
          font-size: clamp(0.8rem, 3vw, 1rem);
        }

        .logout-button {
          background-color: #f00;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 12px;
          cursor: pointer;
          font-size: clamp(0.7rem, 2.5vw, 0.8rem);
        }

        .logout-button:hover {
          background-color: #d00;
        }

        /* ===== АДАПТИВНОСТЬ ===== */
        @media (max-width: 992px) {
          .header {
            padding: 12px 20px;
          }
        }

        @media (max-width: 768px) {
          .header {
            padding: 10px 15px;
          }

          /* Показываем бургер */
          .burger {
            display: flex;
          }

          /* Прячем обычное меню */
          .nav-menu {
            display: none;
            position: absolute;
            top: 100%; /* Встает сразу под шапку */
            left: 0;
            right: 0;
            width: 100%;
            flex-direction: column;
            background-color: #0e0e0ef2;
            padding: 10px 0 15px;
            gap: 5px;
            border-top: 1px solid #333;
            border-bottom: 1px solid #333;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          }

          /* Показываем меню когда открыто */
          .nav-menu.open {
            display: flex;
          }

          .nav-link {
            padding: 8px 15px;
            width: 100%;
            text-align: left;
            font-size: 1rem;
          }

          .nav-link:hover {
            background-color: #222;
          }

          .login-button {
            margin: 5px 15px;
            width: calc(100% - 30px);
            text-align: center !important;
          }

          .user-menu {
            width: calc(100% - 30px);
            margin: 5px 15px;
            justify-content: space-between;
            background-color: #1a1a1a;
          }

          .logout-button {
            padding: 6px 12px;
          }
        }

        @media (max-width: 480px) {
          .user-menu {
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
          }

          .user-name {
            width: 100%;
            text-align: center;
          }

          .nav-link {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 360px) {
          .nav-link {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </header>
  );
}