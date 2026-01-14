import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>Kybrak Motors | Каталог</title>
</Helmet>


export default function Catalog() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    api.get('/cars')
      .then(r => setCars(r.data))
      .catch(err => console.error("Ошибка загрузки машин:", err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Каталог</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))',
          gap: '16px',
        }}
      >
        {cars.map(c => (
          <div
            key={c.id}
            style={{
              border: '1px solid #ddd',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {c.image && (
              <img
                src={c.image}
                alt={c.model}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  marginBottom: '12px',
                }}
              />
            )}
            <h3 style={{ margin: '0 0 8px 0', textAlign: 'center' }}>{c.model}</h3>
            <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{c.year} — €{c.price}</p>
            <p style={{ fontSize: '0.9rem', textAlign: 'center', marginBottom: '12px' }}>
              {c.description}
            </p>
            <Link
              to={'/cars/' + c.id}
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
    </div>
  );
}
