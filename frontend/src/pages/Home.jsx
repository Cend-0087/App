import React from 'react'
import { Link } from 'react-router-dom'


export default function Home() {
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
          padding: '0 20px'
        }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Aurora Motors</h1>
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
            transition: 'background 0.3s'
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            maxWidth: 1000,
            margin: '0 auto'
          }}
        >
          {[
            {
              name: 'Aurora S1',
              img: '/uploads/aurora_s1.jpg',
              desc: 'Комфорт и технологии будущего.'
            },
            {
              name: 'Aurora X',
              img: '/uploads/aurora_x.jpg',
              desc: 'Мощь и уверенность на любой дороге.'
            },
            {
              name: 'Aurora E',
              img: '/uploads/aurora_e.jpg',
              desc: 'Компактность и экономичность.'
            }
          ].map((car) => (
            <div
              key={car.name}
              style={{
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                transition: 'transform 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <img src={car.img} alt={car.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: 8 }}>{car.name}</h3>
                <p style={{ color: '#555', marginBottom: 12 }}>{car.desc}</p>
                <Link
                  to="/catalog"
                  style={{ color: '#f5c518', textDecoration: 'none', fontWeight: 'bold' }}
                >
                  Подробнее →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
