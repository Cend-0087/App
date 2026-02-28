import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-copyright">
        © 2025 Kybrak Motors. Все права защищены.
      </p>
      <div className="footer-links">
        <Link to="/privacy" className="footer-link">
          Политика конфиденциальности
        </Link>
        <Link to="/terms" className="footer-link">
          Условия использования
        </Link>
      </div>

      <style>{`
        .footer {
          background-color: #111;
          color: #ccc;
          text-align: center;
          padding: 40px 20px;
        }

        .footer-copyright {
          margin-bottom: 15px;
          font-size: clamp(0.9rem, 3vw, 1rem);
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap; /* Разрешаем перенос на мобильных */
        }

        .footer-link {
          color: #f5c518;
          text-decoration: none;
          font-size: clamp(0.8rem, 2.5vw, 0.9rem);
          transition: color 0.3s ease, transform 0.2s ease;
          white-space: nowrap; /* Запрещаем перенос текста внутри ссылки */
        }

        .footer-link:hover {
          color: #e6b800;
          text-decoration: underline;
        }

        /* Планшеты */
        @media (max-width: 992px) {
          .footer {
            padding: 35px 20px;
            margin-top: 50px;
          }
        }

        /* Мобильные */
        @media (max-width: 768px) {
          .footer {
            padding: 30px 15px;
          }

          .footer-links {
            gap: 15px;
            flex-direction: column; /* Вертикальное расположение на мобильных */
            align-items: center;
          }

          .footer-link {
            font-size: 0.9rem;
            padding: 5px 0; /* Увеличиваем область касания */
          }
        }

        /* Маленькие телефоны */
        @media (max-width: 480px) {
          .footer {
            padding: 25px 10px;
          }

          .footer-copyright {
            font-size: 0.85rem;
            margin-bottom: 12px;
          }

          .footer-link {
            font-size: 0.85rem;
          }
        }

        /* Очень маленькие телефоны */
        @media (max-width: 360px) {
          .footer {
            padding: 20px 8px;
          }

          .footer-copyright {
            font-size: 0.8rem;
          }

          .footer-link {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </footer>
  );
}