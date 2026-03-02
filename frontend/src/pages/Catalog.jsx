import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { supabase } from '../lib/supabaseClient';

export default function Catalog() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Получаем уникальные года для фильтра
  const years = [...new Set(cars.map(car => car.year))].sort((a, b) => b - a);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error('Ошибка загрузки машин:', error.message);
    } finally {
      setLoading(false);
    }
  }

  // Фильтрация и сортировка
  const filteredCars = cars
    .filter(car => {
      const matchesSearch = car.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = car.price >= priceRange.min && car.price <= priceRange.max;
      const matchesYear = selectedYear === 'all' || car.year === parseInt(selectedYear);
      return matchesSearch && matchesPrice && matchesYear;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'year-desc': return b.year - a.year;
        case 'year-asc': return a.year - b.year;
        default: return 0;
      }
    });

  if (loading) return (
    <div style={styles.loading}>
      <div className="spinner"></div>
      <p>Загрузка автомобилей...</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Kybrak Motors | Каталог</title>
      </Helmet>

      <h2 style={styles.title}>Каталог автомобилей</h2>

      {/* Фильтры */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="🔍 Поиск по модели..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />

        <div style={styles.filterGroup}>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={styles.select}
          >
            <option value="all">Все года</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.select}
          >
            <option value="default">По умолчанию</option>
            <option value="price-asc">Цена ↑</option>
            <option value="price-desc">Цена ↓</option>
            <option value="year-desc">Новые ↑</option>
            <option value="year-asc">Старые ↓</option>
          </select>
        </div>

        <div style={styles.priceRange}>
          <span>Цена: €{priceRange.min} - €{priceRange.max}</span>
          <div style={styles.priceInputs}>
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              style={styles.priceInput}
              placeholder="От"
            />
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              style={styles.priceInput}
              placeholder="До"
            />
          </div>
        </div>
      </div>

      {/* Результаты */}
      <div style={styles.stats}>
        Найдено автомобилей: <strong>{filteredCars.length}</strong>
      </div>

      <div style={styles.grid}>
        {filteredCars.map(car => (
          <div key={car.id} style={styles.cardWrapper}>
            <div style={styles.card}>
              {car.image && (
                <div style={styles.imageContainer}>
                  <img
                    src={car.image}
                    alt={car.model}
                    style={styles.image}
                    onError={(e) => {
                      e.target.src = '/placeholder-car.jpg';
                    }}
                  />
                </div>
              )}
              <h3 style={styles.cardTitle}>{car.model}</h3>
              <div style={styles.cardDetails}>
                <span style={styles.year}>{car.year}</span>
                <span style={styles.price}>€{car.price.toLocaleString()}</span>
              </div>
              <p style={styles.description}>{car.description}</p>
              <Link to={`/cars/${car.id}`} style={styles.button}>
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredCars.length === 0 && (
        <div style={styles.noResults}>
          <p>😕 Автомобили не найдены</p>
          <button onClick={() => {
            setSearchTerm('');
            setPriceRange({ min: 0, max: 200000 });
            setSelectedYear('all');
          }} style={styles.resetButton}>
            Сбросить фильтры
          </button>
        </div>
      )}

      <style>{`
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #f5c518;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 20px auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ✅ ИСПРАВЛЕНО: все ключи уникальны
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '0 20px',
  },
  title: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    color: '#111',
    marginBottom: '30px',
    textAlign: 'center',
  },
  filters: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  searchInput: {
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
  },
  filterGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  select: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '0.95rem',
    flex: 1,
    minWidth: '150px',
  },
  priceRange: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  priceInputs: {
    display: 'flex',
    gap: '10px',
  },
  priceInput: {
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    width: '100px',
  },
  stats: {
    marginBottom: '20px',
    color: '#666',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px',
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    border: '1px solid #eee',
    padding: '15px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '350px',
    margin: '0 auto',
  },
  imageContainer: {
    width: '100%',
    height: '180px',
    overflow: 'hidden',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  cardTitle: {
    margin: '0 0 10px 0',
    fontSize: '1.2rem',
    color: '#111',
  },
  cardDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  year: {
    color: '#666',
    fontSize: '0.95rem',
  },
  price: {
    color: '#f5c518',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  description: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '15px',
    lineHeight: '1.5',
    flex: 1,
  },
  button: {
    textDecoration: 'none',
    backgroundColor: '#f5c518',
    color: '#111',
    padding: '10px 16px',
    borderRadius: '25px',
    fontWeight: 'bold',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
    border: 'none',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '1.2rem',
    color: '#666',
  },
  noResults: {
    textAlign: 'center',
    padding: '50px',
    color: '#666',
  },
  resetButton: {
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#f5c518',
    border: 'none',
    borderRadius: '25px',
    color: '#111',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    '& img': {
      transform: 'scale(1.05)',
    },
  },
};

// Добавляем hover эффект через JS
const CardWithHover = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHover : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {props.children}
    </div>
  );
};