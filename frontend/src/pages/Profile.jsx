import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from '../lib/supabaseClient';

export default function Profile() {
  const { user, logout, loading, updateProfile, isAdmin, isManager, isEmployee } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    avatar: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Перенаправление если не авторизован
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Заполняем форму текущими данными
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    const { success, error } = await updateProfile({
      name: formData.name.trim(),
      phone: formData.phone.trim() || null,
      avatar: formData.avatar.trim() || null,
    });

    if (success) {
      setMessage({ type: 'success', text: 'Профиль успешно обновлён!' });
      setIsEditing(false);
    } else {
      setMessage({ type: 'error', text: error || 'Ошибка при сохранении' });
    }

    setSaving(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) return <div className="loading">Загрузка профиля...</div>;
  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Шапка профиля */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt="Аватар" className="avatar-img" />
            ) : (
              user.name ? user.name[0].toUpperCase() : "U"
            )}
          </div>
          <div>
            <h1 className="profile-title">Личный кабинет</h1>
            <p className="profile-role">
              {isAdmin ? 'Администратор' : 
               isManager ? 'Менеджер' : 
               isEmployee ? 'Сотрудник' : 'Пользователь'}
            </p>
          </div>
        </div>

        {/* Сообщения */}
        {message.text && (
          <div className={`profile-message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Информация о пользователе */}
        <div className="profile-info">
          {!isEditing ? (
            <>
              <div className="info-group">
                <span className="info-label">Имя:</span>
                <span className="info-value">{user.name || 'Не указано'}</span>
              </div>

              <div className="info-group">
                <span className="info-label">Email:</span>
                <span className="info-value">{user.email}</span>
              </div>

              <div className="info-group">
                <span className="info-label">Телефон:</span>
                <span className="info-value">{user.phone || 'Не указан'}</span>
              </div>

              <div className="info-group">
                <span className="info-label">Роль:</span>
                <span className="info-value role-badge">
                  {isAdmin ? 'Администратор' : 
                   isManager ? 'Менеджер' : 
                   isEmployee ? 'Сотрудник' : 'Пользователь'}
                </span>
              </div>

              {user.id && (
                <div className="info-group">
                  <span className="info-label">ID:</span>
                  <span className="info-value user-id">{user.id}</span>
                </div>
              )}
            </>
          ) : (
            /* Форма редактирования */
            <div className="edit-form">
              <div className="form-field">
                <label>Имя</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-field">
                <label>Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div className="form-field">
                <label>Ссылка на аватар (URL)</label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Действия */}
        <div className="profile-actions">
          {!isEditing ? (
            <>
              <button 
                className="action-button edit-button"
                onClick={() => setIsEditing(true)}
              >
                ✎ Редактировать профиль
              </button>
              <button 
                className="action-button logout-button"
                onClick={handleLogout}
              >
                🚪 Выйти
              </button>
            </>
          ) : (
            <>
              <button 
                className="action-button save-button"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Сохранение...' : '💾 Сохранить изменения'}
              </button>
              <button 
                className="action-button cancel-button"
                onClick={() => setIsEditing(false)}
                disabled={saving}
              >
                Отмена
              </button>
            </>
          )}
        </div>

        {/* Дополнительная информация для администраторов */}
        {(isAdmin || isManager) && (
          <div className="admin-info">
            <p>У вас есть доступ к административной панели.</p>
            <a href="/admin" className="admin-link">Перейти в админ-панель →</a>
          </div>
        )}
      </div>

      <style>{`
        .profile-page {
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .profile-container {
          max-width: 520px;
          width: 100%;
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: clamp(25px, 5vw, 40px);
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }

        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f5c518 0%, #e6b800 100%);
          color: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.2rem;
          font-weight: bold;
          box-shadow: 0 4px 15px rgba(245, 197, 24, 0.3);
          overflow: hidden;
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-title {
          font-size: clamp(1.6rem, 4vw, 2.1rem);
          margin: 0;
          color: #111;
        }

        .profile-role {
          margin: 4px 0 0;
          color: #666;
          font-size: 1rem;
        }

        .profile-message {
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 20px;
          text-align: center;
        }

        .profile-message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .profile-message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .profile-info {
          background-color: #f8f9fa;
          border-radius: 16px;
          padding: 25px;
          margin-bottom: 25px;
        }

        .info-group {
          display: flex;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid #eee;
        }

        .info-group:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .info-label {
          flex: 0 0 110px;
          font-weight: 600;
          color: #666;
        }

        .info-value {
          flex: 1;
          color: #111;
          word-break: break-word;
        }

        .role-badge {
          display: inline-block;
          background-color: #f5c518;
          color: #111;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 0.92rem;
          font-weight: bold;
        }

        .user-id {
          font-family: monospace;
          font-size: 0.9rem;
        }

        .edit-form .form-field {
          margin-bottom: 18px;
        }

        .edit-form label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          color: #555;
        }

        .edit-form input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #ddd;
          border-radius: 10px;
          font-size: 1rem;
        }

        .profile-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }

        .action-button {
          flex: 1;
          padding: 13px 20px;
          border: none;
          border-radius: 12px;
          font-size: 1.02rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .edit-button, .save-button {
          background: linear-gradient(135deg, #f5c518 0%, #e6b800 100%);
          color: #111;
        }

        .logout-button, .cancel-button {
          background: #ff4757;
          color: white;
        }

        .admin-info {
          text-align: center;
          padding: 15px;
          background: #f0f8ff;
          border-radius: 12px;
          border: 1px solid #b3d9ff;
        }

        .admin-link {
          color: #0066cc;
          font-weight: 600;
          text-decoration: none;
        }

        .admin-link:hover {
          text-decoration: underline;
        }

        /* Адаптивность */
        @media (max-width: 480px) {
          .profile-container { padding: 20px; }
          .profile-header { flex-direction: column; text-align: center; gap: 12px; }
          .profile-actions { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}