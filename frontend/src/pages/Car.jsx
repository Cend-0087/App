import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function Car() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Модальное окно и форма
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    preferred_date: '',
    contact_method: 'phone',
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchCar();
  }, [id]);

  // Предзаполнение телефона из профиля
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        phone: user.phone || ''
      }));
    }
  }, [user]);

  async function fetchCar() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      setCar(data);
    } catch (error) {
      console.error('Ошибка загрузки автомобиля:', error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleBuyClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setFormMessage({ type: '', text: '' });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormMessage({ type: '', text: '' });

    if (!formData.phone.trim()) {
      setFormMessage({ type: 'error', text: 'Укажите номер телефона' });
      setSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          car_id: car.id,
          total_price: car.price,
          phone: formData.phone.trim(),
          preferred_date: formData.preferred_date || null,
          contact_method: formData.contact_method,
          comment: formData.comment.trim() || null,
          status: 'pending'
        });

      if (error) throw error;

      setFormMessage({ 
        type: 'success', 
        text: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.' 
      });

      // Закрываем модалку через 2.5 секунды
      setTimeout(() => {
        setIsModalOpen(false);
        setFormMessage({ type: '', text: '' });
        setFormData(prev => ({
          ...prev,
          preferred_date: '',
          contact_method: 'phone',
          comment: ''
        }));
      }, 2500);

    } catch (error) {
      console.error('Ошибка создания заказа:', error.message);
      setFormMessage({ 
        type: 'error', 
        text: error.message || 'Не удалось отправить заявку. Попробуйте ещё раз.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    if (!submitting) {
      setIsModalOpen(false);
      setFormMessage({ type: '', text: '' });
    }
  };

  if (loading) return (
    <div style={styles.loading} className="loading">
      <div className="spinner"></div>
      <p>Загрузка автомобиля...</p>
    </div>
  );

  if (!car) return (
    <div style={styles.notFound} className="notFound">
      <h2>Автомобиль не найден</h2>
      <Link to="/catalog" style={styles.backLink} className="backLink">Вернуться в каталог</Link>
    </div>
  );

  // Массив изображений (в реальности должен быть в БД)
  const images = [
    car.image,
    car.image?.replace('.png', '-2.png'),
    car.image?.replace('.png', '-3.png'),
    car.image?.replace('.png', '-4.png'),
  ].filter(Boolean);

  return (
    <div style={styles.container} className="container">
      <Helmet>
        <title>Kybrak Motors | {car.model}</title>
      </Helmet>

      <Link to="/catalog" style={styles.backLink} className="backLink">
        ← Вернуться в каталог
      </Link>

      <div style={styles.content} className="content">
        {/* Левая колонка - изображения */}
        <div style={styles.gallery} className="gallery">
          <div style={styles.mainImage} className="mainImage">
            <img 
              src={images[currentImage] || car.image} 
              alt={car.model}
              style={styles.mainImg}
            />
          </div>
          {images.length > 1 && (
            <div style={styles.thumbnails} className="thumbnails">
              {images.map((img, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.thumbnail,
                    ...(currentImage === index ? styles.thumbnailActive : {})
                  }}
                  className="thumbnail"
                  onClick={() => setCurrentImage(index)}
                >
                  <img src={img} alt={`${car.model} ${index + 1}`} style={styles.thumbImg} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Правая колонка - информация */}
        <div style={styles.info} className="info">
          <h1 style={styles.title} className="title">{car.model}</h1>
          
          <div style={styles.priceSection} className="priceSection">
            <span style={styles.price} className="price">€{car.price.toLocaleString()}</span>
            <span style={styles.year} className="year">{car.year} год</span>
          </div>

          <div style={styles.specs} className="specs">
            <h3 style={styles.sectionTitle} className="sectionTitle">Характеристики</h3>
            <table style={styles.specsTable} className="specsTable">
              <tbody>
                <tr>
                  <td>Двигатель</td>
                  <td>{car.specs?.engine || 'Бензиновый'}</td>
                </tr>
                <tr>
                  <td>Мощность</td>
                  <td>{car.specs?.hp || '250'} л.с.</td>
                </tr>
                <tr>
                  <td>Разгон 0-100 км/ч</td>
                  <td>{car.specs?.acceleration || '6.5'} с</td>
                </tr>
                <tr>
                  <td>Привод</td>
                  <td>{car.specs?.drive || 'Полный'}</td>
                </tr>
                <tr>
                  <td>Коробка передач</td>
                  <td>{car.specs?.transmission || 'Автомат'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={styles.description} className="description">
            <h3 style={styles.sectionTitle} className="sectionTitle">Описание</h3>
            <p style={styles.descriptionText} className="descriptionText">{car.description}</p>
          </div>

          <button onClick={handleBuyClick} style={styles.buyButton} className="buyButton">
            {user ? 'Оставить заявку' : 'Войдите для покупки'}
          </button>
        </div>
      </div>

      {/* ===== МОДАЛЬНОЕ ОКНО ЗАЯВКИ ===== */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Заявка на автомобиль</h2>
              <button style={styles.closeButton} onClick={closeModal} disabled={submitting}>
                ×
              </button>
            </div>

            <div style={styles.modalCarInfo}>
              <strong>{car.model}</strong>
              <span>€{car.price.toLocaleString()}</span>
            </div>

            {formMessage.text && (
              <div style={{
                ...styles.formMessage,
                ...(formMessage.type === 'success' ? styles.formMessageSuccess : styles.formMessageError)
              }}>
                {formMessage.text}
              </div>
            )}

            {formMessage.type !== 'success' && (
              <form onSubmit={handleSubmitOrder} style={styles.form}>
                <div style={styles.formField}>
                  <label style={styles.label}>Ваше имя</label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    disabled
                    style={{ ...styles.input, ...styles.inputDisabled }}
                  />
                </div>

                <div style={styles.formField}>
                  <label style={styles.label}>Телефон *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (___) ___-__-__"
                    required
                    style={styles.input}
                    disabled={submitting}
                  />
                </div>

                <div style={styles.formField}>
                  <label style={styles.label}>Желаемая дата осмотра</label>
                  <input
                    type="date"
                    name="preferred_date"
                    value={formData.preferred_date}
                    onChange={handleInputChange}
                    style={styles.input}
                    disabled={submitting}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div style={styles.formField}>
                  <label style={styles.label}>Предпочтительный способ связи</label>
                  <select
                    name="contact_method"
                    value={formData.contact_method}
                    onChange={handleInputChange}
                    style={styles.input}
                    disabled={submitting}
                  >
                    <option value="phone">Звонок</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="telegram">Telegram</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                <div style={styles.formField}>
                  <label style={styles.label}>Комментарий</label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    placeholder="Пожелания, вопросы, удобное время для звонка..."
                    rows={3}
                    style={{ ...styles.input, ...styles.textarea }}
                    disabled={submitting}
                  />
                </div>

                <button
                  type="submit"
                  style={styles.submitButton}
                  disabled={submitting}
                >
                  {submitting ? 'Отправляем...' : 'Отправить заявку'}
                </button>
              </form>
            )}
          </div>
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

        /* Медиа-запросы для мобильных устройств */
        @media (max-width: 768px) {
          .content {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 550px) {
          .content {
            grid-template-columns: 1fr !important;
          }
          
          .container {
            margin: 20px auto !important;
            padding: 0 12px !important;
          }
          
          .content {
            gap: 20px !important;
          }
          
          .gallery {
            gap: 10px !important;
          }
          
          .mainImage {
            height: 280px !important;
            border-radius: 10px !important;
          }
          
          .thumbnails {
            gap: 6px !important;
          }
          
          .thumbnail {
            height: 60px !important;
            border-radius: 6px !important;
          }
          
          .priceSection {
            padding: 12px 0 !important;
          }
          
          .price {
            font-size: 1.8rem !important;
          }
          
          .year {
            font-size: 1.1rem !important;
          }
          
          .specs {
            padding: 15px !important;
            border-radius: 10px !important;
          }
          
          .specsTable td {
            padding: 8px 0 !important;
          }
          
          .buyButton {
            width: 100% !important;
            padding: 15px 20px !important;
            border-radius: 25px !important;
            margin-top: 5px !important;
          }
          
          .backLink {
            margin-bottom: 15px !important;
          }
        }

        @media (max-width: 480px) {
          .mainImage {
            height: 240px !important;
          }
          
          .thumbnail {
            height: 50px !important;
          }
          
          .title {
            font-size: 1.6rem !important;
          }
          
          .price {
            font-size: 1.6rem !important;
          }
          
          .year {
            font-size: 1rem !important;
          }
        }

        @media (max-width: 360px) {
          .mainImage {
            height: 200px !important;
          }
          
          .thumbnails {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 4px !important;
          }
          
          .thumbnail {
            height: 45px !important;
          }
          
          .title {
            font-size: 1.4rem !important;
          }
          
          .priceSection {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 5px !important;
          }
          
          .price {
            font-size: 1.5rem !important;
          }
          
          .specs {
            padding: 12px !important;
          }
          
          .specsTable {
            font-size: 0.85rem !important;
          }
          
          .specsTable td {
            padding: 6px 0 !important;
          }
          
          .descriptionText {
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
          }
          
          .buyButton {
            padding: 12px 16px !important;
            font-size: 1rem !important;
          }
        }

        /* Для очень маленьких экранов */
        @media (max-width: 320px) {
          .mainImage {
            height: 180px !important;
          }
          
          .thumbnail {
            height: 40px !important;
          }
          
          .title {
            font-size: 1.3rem !important;
          }
          
          .price {
            font-size: 1.4rem !important;
          }
        }

        /* Горизонтальная ориентация на мобильных */
        @media (max-height: 500px) and (orientation: landscape) {
          .mainImage {
            height: 200px !important;
          }
          
          .content {
            grid-template-columns: 1fr 1fr !important;
            gap: 15px !important;
          }
          
          .thumbnail {
            height: 45px !important;
          }
          
          .buyButton {
            padding: 10px 16px !important;
          }
        }

        /* Поддержка сенсорных устройств */
        @media (hover: none) {
          .buyButton:hover {
            transform: none !important;
            background-color: #f5c518 !important;
            box-shadow: none !important;
          }
          
          .thumbnail:active {
            opacity: 0.7;
          }
        }

        /* Улучшение читаемости на мобильных */
        @media (max-width: 550px) {
          .descriptionText {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          .specsTable td {
            -webkit-font-smoothing: antialiased;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '0 20px',
    width: '100%',
    boxSizing: 'border-box',
  },
  backLink: {
    color: '#666',
    textDecoration: 'none',
    marginBottom: '20px',
    display: 'inline-block',
    transition: 'color 0.3s ease',
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
    cursor: 'pointer',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'clamp(20px, 4vw, 40px)',
    marginTop: '20px',
    width: '100%',
  },
  gallery: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
  },
  mainImage: {
    width: '100%',
    height: 'clamp(250px, 50vw, 400px)',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  mainImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  thumbnails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    width: '100%',
  },
  thumbnail: {
    width: '100%',
    height: 'clamp(50px, 10vw, 80px)',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'border-color 0.3s ease',
    backgroundColor: '#f5f5f5',
  },
  thumbnailActive: {
    borderColor: '#f5c518',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(15px, 3vw, 25px)',
    width: '100%',
  },
  title: {
    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
    color: '#111',
    margin: 0,
    lineHeight: 1.2,
    fontWeight: 'bold',
  },
  priceSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(10px, 3vw, 20px)',
    padding: 'clamp(10px, 2vw, 15px) 0',
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee',
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    color: '#f5c518',
    fontWeight: 'bold',
    lineHeight: 1.2,
  },
  year: {
    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
    color: '#666',
    fontWeight: 500,
  },
  sectionTitle: {
    fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
    color: '#111',
    marginBottom: 'clamp(10px, 2vw, 15px)',
    fontWeight: 600,
  },
  specs: {
    backgroundColor: '#f8f9fa',
    padding: 'clamp(15px, 3vw, 20px)',
    borderRadius: '12px',
    width: '100%',
    boxSizing: 'border-box',
  },
  specsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
  },
  description: {
    lineHeight: 1.7,
    width: '100%',
  },
  descriptionText: {
    color: '#444',
    fontSize: 'clamp(0.95rem, 2.5vw, 1rem)',
    lineHeight: 1.7,
    margin: 0,
  },
  buyButton: {
    padding: 'clamp(12px, 3vw, 15px) clamp(20px, 5vw, 30px)',
    backgroundColor: '#f5c518',
    color: '#111',
    border: 'none',
    borderRadius: '30px',
    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
    width: 'fit-content',
    minWidth: '200px',
  },
  loading: {
    textAlign: 'center',
    padding: '50px 20px',
    fontSize: '1.2rem',
    color: '#666',
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: {
    textAlign: 'center',
    padding: '50px 20px',
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ===== Стили модального окна =====
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '480px',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '28px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.45rem',
    color: '#111',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.8rem',
    cursor: 'pointer',
    color: '#999',
    lineHeight: 1,
    padding: '0 4px',
  },
  modalCarInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: '12px 16px',
    borderRadius: '10px',
    marginBottom: '20px',
    fontSize: '1.05rem',
  },
  formMessage: {
    padding: '12px 16px',
    borderRadius: '10px',
    marginBottom: '18px',
    textAlign: 'center',
    fontSize: '0.95rem',
  },
  formMessageSuccess: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
  formMessageError: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.92rem',
    fontWeight: 600,
    color: '#444',
  },
  input: {
    padding: '12px 14px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    fontSize: '1rem',
    outline: 'none',
  },
  inputDisabled: {
    backgroundColor: '#f3f4f6',
    color: '#666',
  },
  textarea: {
    resize: 'vertical',
    minHeight: '80px',
  },
  submitButton: {
    marginTop: '8px',
    padding: '14px',
    backgroundColor: '#f5c518',
    color: '#111',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.05rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
};

// Добавляем стили для таблицы через объект
Object.assign(styles.specsTable, {
  '& td': {
    padding: '8px 0',
    borderBottom: '1px solid #ddd',
  },
  '& td:first-child': {
    color: '#666',
    fontWeight: 500,
  },
  '& td:last-child': {
    color: '#111',
    fontWeight: 600,
    textAlign: 'right',
  },
  '& tr:last-child td': {
    borderBottom: 'none',
  },
});