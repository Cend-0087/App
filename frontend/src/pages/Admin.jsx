import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Admin() {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('cars'); // 'cars' | 'orders'

  // ===== Автомобили =====
  const [cars, setCars] = useState([]);
  const [carsLoading, setCarsLoading] = useState(true);
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null); // null = создание
  const [carForm, setCarForm] = useState({
    model: '',
    year: '',
    price: '',
    description: '',
    image: ''
  });
  const [carSubmitting, setCarSubmitting] = useState(false);
  const [carMessage, setCarMessage] = useState({ type: '', text: '' });

  // ===== Заявки =====
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // для модалки деталей заявки

  useEffect(() => {
    if (activeTab === 'cars') fetchCars();
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  // ---------- Автомобили ----------
  async function fetchCars() {
    setCarsLoading(true);
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (err) {
      console.error('Ошибка загрузки машин:', err.message);
    } finally {
      setCarsLoading(false);
    }
  }

  const openCreateCarModal = () => {
    setEditingCar(null);
    setCarForm({ model: '', year: '', price: '', description: '', image: '' });
    setCarMessage({ type: '', text: '' });
    setIsCarModalOpen(true);
  };

  const openEditCarModal = (car) => {
    setEditingCar(car);
    setCarForm({
      model: car.model || '',
      year: car.year || '',
      price: car.price || '',
      description: car.description || '',
      image: car.image || ''
    });
    setCarMessage({ type: '', text: '' });
    setIsCarModalOpen(true);
  };

  const handleCarInputChange = (e) => {
    const { name, value } = e.target;
    setCarForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveCar = async (e) => {
    e.preventDefault();
    setCarSubmitting(true);
    setCarMessage({ type: '', text: '' });

    if (!carForm.model.trim() || !carForm.year || !carForm.price) {
      setCarMessage({ type: 'error', text: 'Заполните модель, год и цену' });
      setCarSubmitting(false);
      return;
    }

    const payload = {
      model: carForm.model.trim(),
      year: Number(carForm.year),
      price: Number(carForm.price),
      description: carForm.description.trim() || null,
      image: carForm.image.trim() || null,
      updated_at: new Date().toISOString()
    };

    try {
      if (editingCar) {
        // Редактирование
        const { error } = await supabase
          .from('cars')
          .update(payload)
          .eq('id', editingCar.id);

        if (error) throw error;
        setCarMessage({ type: 'success', text: 'Автомобиль обновлён' });
      } else {
        // Создание
        const { error } = await supabase
          .from('cars')
          .insert(payload);

        if (error) throw error;
        setCarMessage({ type: 'success', text: 'Автомобиль добавлен' });
      }

      await fetchCars();
      setTimeout(() => {
        setIsCarModalOpen(false);
        setCarMessage({ type: '', text: '' });
      }, 1200);
    } catch (err) {
      console.error(err);
      setCarMessage({ type: 'error', text: err.message || 'Ошибка сохранения' });
    } finally {
      setCarSubmitting(false);
    }
  };

  const handleDeleteCar = async (carId, model) => {
    if (!window.confirm(`Удалить автомобиль «${model}»?`)) return;

    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', carId);

      if (error) throw error;
      await fetchCars();
    } catch (err) {
      alert('Ошибка удаления: ' + err.message);
    }
  };

  // ---------- Заявки ----------
  async function fetchOrders() {
    setOrdersLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
        *,
        cars (
          model,
          price
        ),
        profiles (
          name
        )
      `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Ошибка загрузки заявок:', err.message);
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  }

  const handleChangeOrderStatus = async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      await fetchOrders();
    } catch (err) {
      alert('Ошибка смены статуса: ' + err.message);
    }
  };

  const statusLabels = {
    pending: 'Новая',
    confirmed: 'Подтверждена',
    completed: 'Завершена',
    cancelled: 'Отменена'
  };

  const statusColors = {
    pending: '#f59e0b',
    confirmed: '#3b82f6',
    completed: '#10b981',
    cancelled: '#ef4444'
  };

  return (
    <div style={styles.page}>
      <Helmet>
        <title>Kybrak Motors | Админ-панель</title>
      </Helmet>

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Админ-панель</h1>
          <p style={styles.subtitle}>Управление автомобилями и заявками</p>
        </div>
        <Link to="/" style={styles.backLink}>← На сайт</Link>
      </div>

      {/* Вкладки */}
      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'cars' ? styles.tabActive : {})
          }}
          onClick={() => setActiveTab('cars')}
        >
          Автомобили ({cars.length})
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'orders' ? styles.tabActive : {})
          }}
          onClick={() => setActiveTab('orders')}
        >
          Заявки ({orders.length})
        </button>
      </div>

      {/* ===== ВКЛАДКА АВТОМОБИЛИ ===== */}
      {activeTab === 'cars' && (
        <div>
          <div style={styles.toolbar}>
            <button style={styles.addButton} onClick={openCreateCarModal}>
              + Добавить автомобиль
            </button>
          </div>

          {carsLoading ? (
            <div style={styles.loading}>Загрузка...</div>
          ) : cars.length === 0 ? (
            <div style={styles.empty}>Автомобилей пока нет</div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Модель</th>
                    <th style={styles.th}>Год</th>
                    <th style={styles.th}>Цена</th>
                    <th style={styles.th}>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map(car => (
                    <tr key={car.id} style={styles.tr}>
                      <td style={styles.td}>
                        <div style={styles.carCell}>
                          {car.image && (
                            <img src={car.image} alt="" style={styles.carThumb} />
                          )}
                          <span>{car.model}</span>
                        </div>
                      </td>
                      <td style={styles.td}>{car.year}</td>
                      <td style={styles.td}>€{Number(car.price).toLocaleString()}</td>
                      <td style={styles.td}>
                        <div style={styles.actions}>
                          <button
                            style={styles.editBtn}
                            onClick={() => openEditCarModal(car)}
                          >
                            Изменить
                          </button>
                          <button
                            style={styles.deleteBtn}
                            onClick={() => handleDeleteCar(car.id, car.model)}
                          >
                            Удалить
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ===== ВКЛАДКА ЗАЯВКИ ===== */}
      {activeTab === 'orders' && (
        <div>
          {ordersLoading ? (
            <div style={styles.loading}>Загрузка заявок...</div>
          ) : orders.length === 0 ? (
            <div style={styles.empty}>Заявок пока нет</div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Дата</th>
                    <th style={styles.th}>Автомобиль</th>
                    <th style={styles.th}>Телефон</th>
                    <th style={styles.th}>Имя</th>
                    <th style={styles.th}>Статус</th>
                    <th style={styles.th}>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} style={styles.tr}>

                      <td style={styles.td}>
                        {new Date(order.created_at).toLocaleString('ru-RU')}
                      </td>
                      <td style={styles.td}>
                        {order.cars?.model || '—'}
                        <div style={styles.smallText}>
                          €{Number(order.total_price).toLocaleString()}
                        </div>
                      </td>
                      <td style={styles.td}>{order.phone || '—'}</td>
                                            <td style={styles.td}>
                        <div>{order.profiles?.name || '—'}</div>
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: statusColors[order.status] || '#999'
                        }}>
                          {statusLabels[order.status] || order.status}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.editBtn}
                          onClick={() => setSelectedOrder(order)}
                        >
                          Подробнее
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ===== МОДАЛКА ДЕТАЛЕЙ ЗАЯВКИ ===== */}
      {selectedOrder && (
        <div style={styles.modalOverlay} onClick={() => setSelectedOrder(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Заявка</h2>
              <button style={styles.closeBtn} onClick={() => setSelectedOrder(null)}>×</button>
            </div>

            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Автомобиль:</span>
              <span>{selectedOrder.cars?.model || '—'}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Цена:</span>
              <span>€{Number(selectedOrder.total_price).toLocaleString()}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Телефон:</span>
              <span>{selectedOrder.phone || '—'}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Способ связи:</span>
              <span>
                {{
                  phone: 'Звонок',
                  whatsapp: 'WhatsApp',
                  telegram: 'Telegram',
                  email: 'Email'
                }[selectedOrder.contact_method] || selectedOrder.contact_method || '—'}
              </span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Клиент:</span>
              <span>{selectedOrder.profiles?.name || '—'}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Желаемая дата:</span>
              <span>
                {selectedOrder.preferred_date
                  ? new Date(selectedOrder.preferred_date).toLocaleDateString('ru-RU')
                  : '—'}
              </span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Комментарий:</span>
              <span style={{ whiteSpace: 'pre-wrap' }}>
                {selectedOrder.comment || '—'}
              </span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Дата заявки:</span>
              <span>{new Date(selectedOrder.created_at).toLocaleString('ru-RU')}</span>
            </div>

            <div style={{ marginTop: '20px' }}>
              <label style={styles.label}>Статус заявки</label>
              <select
                value={selectedOrder.status}
                onChange={(e) => {
                  handleChangeOrderStatus(selectedOrder.id, e.target.value);
                  setSelectedOrder(prev => ({ ...prev, status: e.target.value }));
                }}
                style={{ ...styles.input, marginTop: '6px', marginLeft: '20px' }}
              >
                <option value="pending">Новая</option>
                <option value="confirmed">Подтверждена</option>
                <option value="completed">Завершена</option>
                <option value="cancelled">Отменена</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ===== МОДАЛКА АВТОМОБИЛЯ ===== */}
      {isCarModalOpen && (
        <div style={styles.modalOverlay} onClick={() => !carSubmitting && setIsCarModalOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingCar ? 'Редактировать автомобиль' : 'Добавить автомобиль'}
              </h2>
              <button
                style={styles.closeBtn}
                onClick={() => !carSubmitting && setIsCarModalOpen(false)}
              >
                ×
              </button>
            </div>

            {carMessage.text && (
              <div style={{
                ...styles.message,
                ...(carMessage.type === 'success' ? styles.messageSuccess : styles.messageError)
              }}>
                {carMessage.text}
              </div>
            )}

            <form onSubmit={handleSaveCar} style={styles.form}>
              <div style={styles.formField}>
                <label style={styles.label}>Модель *</label>
                <input
                  name="model"
                  value={carForm.model}
                  onChange={handleCarInputChange}
                  style={styles.input}
                  required
                  disabled={carSubmitting}
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formField}>
                  <label style={styles.label}>Год *</label>
                  <input
                    type="number"
                    name="year"
                    value={carForm.year}
                    onChange={handleCarInputChange}
                    style={styles.input}
                    required
                    min="1990"
                    max="2030"
                    disabled={carSubmitting}
                  />
                </div>
                <div style={styles.formField}>
                  <label style={styles.label}>Цена (€) *</label>
                  <input
                    type="number"
                    name="price"
                    value={carForm.price}
                    onChange={handleCarInputChange}
                    style={styles.input}
                    required
                    min="0"
                    disabled={carSubmitting}
                  />
                </div>
              </div>

              <div style={styles.formField}>
                <label style={styles.label}>Ссылка на изображение</label>
                <input
                  name="image"
                  value={carForm.image}
                  onChange={handleCarInputChange}
                  style={styles.input}
                  placeholder="https://..."
                  disabled={carSubmitting}
                />
              </div>

              <div style={styles.formField}>
                <label style={styles.label}>Описание</label>
                <textarea
                  name="description"
                  value={carForm.description}
                  onChange={handleCarInputChange}
                  style={{ ...styles.input, minHeight: '90px' }}
                  disabled={carSubmitting}
                />
              </div>

              <button
                type="submit"
                style={styles.submitBtn}
                disabled={carSubmitting}
              >
                {carSubmitting ? 'Сохраняем...' : (editingCar ? 'Сохранить изменения' : 'Добавить')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '30px 20px 60px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '28px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  title: {
    margin: 0,
    fontSize: '1.9rem',
    color: '#111',
  },
  subtitle: {
    margin: '6px 0 0',
    color: '#666',
  },
  backLink: {
    color: '#666',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    borderBottom: '1px solid #eee',
    paddingBottom: '4px',
  },
  tab: {
    padding: '10px 20px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 500,
    color: '#666',
    borderRadius: '8px 8px 0 0',
  },
  tabActive: {
    backgroundColor: '#f5c518',
    color: '#111',
    fontWeight: 600,
  },
  toolbar: {
    marginBottom: '18px',
  },
  addButton: {
    padding: '11px 20px',
    backgroundColor: '#f5c518',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.98rem',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
  },
  empty: {
    textAlign: 'center',
    padding: '40px',
    color: '#999',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
  },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '12px',
    border: '1px solid #eee',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
  },
  th: {
    textAlign: 'left',
    padding: '14px 16px',
    backgroundColor: '#f8f9fa',
    fontWeight: 600,
    fontSize: '0.9rem',
    color: '#555',
    borderBottom: '1px solid #eee',
  },
  tr: {
    borderBottom: '1px solid #f0f0f0',
  },
  td: {
    padding: '14px 16px',
    verticalAlign: 'middle',
    fontSize: '0.95rem',
  },
  carCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  carThumb: {
    width: '52px',
    height: '40px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  editBtn: {
    padding: '6px 12px',
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  deleteBtn: {
    padding: '6px 12px',
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  smallText: {
    fontSize: '0.8rem',
    color: '#888',
    marginTop: '2px',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '20px',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 600,
  },
  statusSelect: {
    padding: '6px 10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '0.85rem',
  },

  // Модалка
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    maxWidth: '520px',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '28px',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.35rem',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.7rem',
    cursor: 'pointer',
    color: '#999',
  },
  message: {
    padding: '12px 16px',
    borderRadius: '10px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  messageSuccess: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  messageError: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#444',
  },
  input: {
    padding: '11px 13px',
    border: '1px solid #ddd',
    borderRadius: '9px',
    fontSize: '1rem',
  },
  submitBtn: {
    marginTop: '8px',
    padding: '13px',
    backgroundColor: '#f5c518',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
  },
  detailRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
    fontSize: '0.98rem',
    lineHeight: 1.4,
  },
  detailLabel: {
    flex: '0 0 140px',
    color: '#666',
    fontWeight: 500,
  },
};