import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const popularCars = [
    {
      id: 1,
      name: 'Kybrak Lightning X',
      image: '/uploads/car1.png',
      desc: 'Комфорт и технологии будущего.',
      price: '48 000',
      year: 2024,
    },
    {
      id: 2,
      name: 'Kybrak Falcon S',
      image: '/uploads/car2.png',
      desc: 'Мощь и уверенность на любой дороге.',
      price: '67 000',
      year: 2025,
    },
    {
      id: 3,
      name: 'Kybrak Storm EV',
      image: '/uploads/car3.png',
      desc: 'Компактность и экономичность.',
      price: '39 500',
      year: 2023,
    },
  ];

  return (
    <div className="home-page">
      {/* Hero секция */}
      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Kybrak Motors</h1>
          <p className="hero-subtitle">
            Инновации, элегантность и мощь — воплощённые в каждой детали.
          </p>
          <Link to="/catalog" className="hero-button">
            Смотреть автомобили
          </Link>
        </div>
      </section>

      {/* О компании */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">О компании Kybrak</h2>
          <p className="about-text">
            Kybrak Motors — это производитель автомобилей нового поколения. Мы создаём машины,
            сочетающие технологии, экологичность и удовольствие от вождения.
            Каждый автомобиль — результат инженерной точности и эстетического совершенства.
          </p>
        </div>
      </section>

      {/* Популярные модели */}
      <section className="models-section">
        <div className="container">
          <h2 className="section-title">Популярные модели</h2>
          <div className="models-grid">
            {popularCars.map((car) => (
              <div key={car.id} className="model-card">
                {car.image && (
                  <img
                    src={car.image}
                    alt={car.name}
                    className="model-image"
                  />
                )}
                <h3 className="model-name">{car.name}</h3>
                <p className="model-price">
                  {car.year} — €{car.price}
                </p>
                <p className="model-desc">{car.desc}</p>
                <Link to="/catalog" className="model-button">
                  Подробнее
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .home-page {
          font-family: sans-serif;
          color: #222;
        }

        /* Hero секция */
        .hero {
          height: 90vh;
          background-image: url('https://images.unsplash.com/photo-1606220838315-056192d5e8d9?auto=format&fit=crop&w=2000&q=80');
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-overlay {
          width: 100%;
          height: 100%;
          background: #bfbfbf45; /* Затемнение для лучшей читаемости */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          text-align: center;
          padding: 0 20px;
        }

        .hero-title {
          font-size: clamp(2rem, 8vw, 3.5rem);
          margin-bottom: 1rem;
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
          animation: fadeInUp 1s ease;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 4vw, 1.3rem);
          max-width: 600px;
          line-height: 1.5;
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
          animation: fadeInUp 1s ease 0.2s both;
        }

        .hero-button {
          margin-top: 2rem;
          background-color: #f5c518;
          color: #222;
          padding: clamp(10px, 3vw, 12px) clamp(20px, 5vw, 30px);
          border-radius: 30px;
          text-decoration: none;
          font-weight: bold;
          transition: all 0.3s ease;
          animation: fadeInUp 1s ease 0.4s both;
          font-size: clamp(0.9rem, 3vw, 1rem);
          border: 2px solid transparent;
        }

        .hero-button:hover {
          background-color: #ffe04f;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(245, 197, 24, 0.4);
        }

        .hero-button:active {
          transform: translateY(0);
        }

        /* Общие стили для секций */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .about-section {
          padding: clamp(40px, 8vw, 80px) 20px;
        }

        .section-title {
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          margin-bottom: clamp(20px, 4vw, 40px);
          text-align: center;
          color: #111;
        }

        .about-text {
          font-size: clamp(1rem, 3vw, 1.1rem);
          line-height: 1.7;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
          color: #444;
        }

        /* Секция с моделями */
        .models-section {
          background-color: #bfbfbf45;
          padding: clamp(40px, 8vw, 60px) 20px;
        }

        .models-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: clamp(15px, 3vw, 25px);
          max-width: 1200px;
          margin: 0 auto;
        }

        .model-card {
          border: 1px solid #eee;
          padding: clamp(10px, 3vw, 15px);
          border-radius: 12px;
          background-color: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.3s ease;
          height: 100%;
        }

        .model-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          border-color: #f5c518;
        }

        .model-image {
          width: 100%;
          height: clamp(140px, 20vw, 180px);
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 15px;
          transition: transform 0.3s ease;
        }

        .model-card:hover .model-image {
          transform: scale(1.02);
        }

        .model-name {
          margin: 0 0 8px 0;
          text-align: center;
          font-size: clamp(1.1rem, 3vw, 1.3rem);
          color: #111;
        }

        .model-price {
          margin: 0 0 8px 0;
          font-weight: bold;
          color: #f5c518;
          font-size: clamp(0.9rem, 2.5vw, 1rem);
        }

        .model-desc {
          font-size: clamp(0.85rem, 2.5vw, 0.95rem);
          text-align: center;
          margin-bottom: 15px;
          color: #666;
          line-height: 1.5;
        }

        .model-button {
          text-decoration: none;
          background-color: #f5c518;
          color: #111;
          padding: clamp(6px, 2vw, 8px) clamp(12px, 4vw, 16px);
          border-radius: 25px;
          font-weight: bold;
          transition: all 0.3s ease;
          margin-top: auto;
          font-size: clamp(0.85rem, 2.5vw, 0.95rem);
        }

        .model-button:hover {
          background-color: #e6b800;
          transform: scale(1.05);
        }

        /* Анимации */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Планшеты */
        @media (max-width: 992px) {
          .hero {
            height: 80vh;
          }

          .models-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Мобильные */
        @media (max-width: 768px) {
          .hero {
            height: 70vh;
          }

          .hero-title {
            margin-bottom: 0.5rem;
          }

          .hero-button {
            margin-top: 1.5rem;
          }

          .about-section {
            padding: 40px 15px;
          }

          .models-section {
            padding: 40px 15px;
          }

          .models-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .model-card {
            max-width: 400px;
            margin: 0 auto;
            width: 100%;
          }
        }

        /* Маленькие телефоны */
        @media (max-width: 480px) {
          .hero {
            height: 60vh;
          }

          .hero-overlay {
            padding: 0 15px;
          }

          .hero-button {
            padding: 8px 20px;
          }

          .about-section {
            padding: 30px 15px;
          }

          .section-title {
            margin-bottom: 20px;
          }

          .about-text {
            font-size: 0.95rem;
            line-height: 1.6;
          }

          .model-card {
            padding: 12px;
          }

          .model-image {
            height: 150px;
          }
        }

        /* Очень маленькие телефоны */
        @media (max-width: 360px) {
          .hero {
            height: 50vh;
          }

          .hero-title {
            font-size: 1.8rem;
          }

          .hero-subtitle {
            font-size: 0.9rem;
          }

          .hero-button {
            padding: 6px 15px;
            font-size: 0.85rem;
          }

          .about-text {
            font-size: 0.9rem;
          }

          .model-name {
            font-size: 1rem;
          }

          .model-price {
            font-size: 0.85rem;
          }

          .model-desc {
            font-size: 0.8rem;
          }
        }

        /* Для устройств с сенсорным экраном */
        @media (hover: none) and (pointer: coarse) {
          .model-card:hover {
            transform: none;
          }

          .model-card:active {
            transform: scale(0.98);
          }

          .hero-button:hover {
            background-color: #f5c518;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}