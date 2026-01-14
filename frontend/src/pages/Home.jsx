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
    <div className="home-page" style={{ fontFamily: 'sans-serif', color: '#222' }}>
      {/* Hero секция */}
      <section
        style={{
          height: '90vh',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1606220838315-056192d5e8d9?auto=format&fit=crop&w=2000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Kybrak Motors</h1>
        <p style={{ fontSize: '1.3rem', maxWidth: 600, lineHeight: 1.5 }}>
          Инновации, элегантность и мощь — воплощённые в каждой детали.
        </p>
        <Link
          to="/catalog"
          style={{
            marginTop: '2rem',
            backgroundColor: '#f5c518',
            color: '#222',
            padding: '12px 30px',
            borderRadius: '30px',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'background 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#ffe04f')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#f5c518')}
        >
          Смотреть автомобили
        </Link>
      </section>

      {/* О компании */}
      <section style={{ padding: '80px 20px', maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: 20, textAlign: 'center' }}>О компании Aurora</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, textAlign: 'center' }}>
          Aurora Motors — это производитель автомобилей нового поколения. Мы создаём машины,
          сочетающие технологии, экологичность и удовольствие от вождения.
          Каждый автомобиль — результат инженерной точности и эстетического совершенства.
        </p>
      </section>

      {/* Популярные модели */}
      <section style={{ backgroundColor: '#f9f9f9', padding: '60px 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Популярные модели</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            maxWidth: 1000,
            margin: '0 auto',
          }}
        >
          {popularCars.map((car) => (
            <div
              key={car.id}
              style={{
                border: '1px solid #ddd',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {car.image && (
                <img
                  src={car.image}
                  alt={car.name}
                  style={{
                    width: '100%',
                    height: '160px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginBottom: '12px',
                  }}
                />
              )}
              <h3 style={{ margin: '0 0 8px 0', textAlign: 'center' }}>{car.name}</h3>
              <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>
                {car.year} — €{car.price}
              </p>
              <p style={{ fontSize: '0.9rem', textAlign: 'center', marginBottom: '12px' }}>
                {car.desc}
              </p>
              <Link
                to="/catalog"
                style={{
                  textDecoration: 'none',
                  backgroundColor: '#f5c518',
                  color: '#111',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  fontWeight: 'bold',
                }}
              >
                Подробнее
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
