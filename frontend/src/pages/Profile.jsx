import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user, logout, loading } = useAuth(); // Добавили loading
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Перенаправление если пользователь не залогинен
  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) return <div>Загрузка...</div>; // Добавили проверку loading
  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Шапка профиля с аватаркой */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <h1 className="profile-title">Личный кабинет</h1>
        </div>

        {/* Информация о пользователе */}
        <div className="profile-info">
          <div className="info-group">
            <span className="info-label">Имя:</span>
            <span className="info-value">{user.name}</span>
          </div>

          <div className="info-group">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>

          <div className="info-group">
            <span className="info-label">Роль:</span>
            <span className="info-value role-badge">
              {user.role === "admin" ? "Администратор" : "Пользователь"}
            </span>
          </div>

          {user.phone && (
            <div className="info-group">
              <span className="info-label">Телефон:</span>
              <span className="info-value">{user.phone}</span>
            </div>
          )}

          {user.registeredAt && (
            <div className="info-group">
              <span className="info-label">На сайте с:</span>
              <span className="info-value">
                {new Date(user.registeredAt).toLocaleDateString('ru-RU')}
              </span>
            </div>
          )}
        </div>

        {/* Действия */}
        <div className="profile-actions">
          <button 
            className="action-button edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            ✎ Редактировать профиль
          </button>
          <button 
            className="action-button logout-button"
            onClick={handleLogout}
          >
            🚪 Выйти
          </button>
        </div>

        {/* Дополнительная информация (если нужно) */}
        <div className="profile-footer">
          <p className="footer-text">
            ID пользователя: <span className="user-id">{user.id || "Не указан"}</span>
          </p>
        </div>
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
          max-width: 500px;
          width: 100%;
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: clamp(25px, 5vw, 40px);
          transition: transform 0.3s ease;
        }

        .profile-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
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
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f5c518 0%, #e6b800 100%);
          color: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          box-shadow: 0 4px 10px rgba(245, 197, 24, 0.3);
        }

        .profile-title {
          font-size: clamp(1.5rem, 4vw, 2rem);
          color: #111;
          font-weight: bold;
          margin: 0;
        }

        .profile-info {
          background-color: #f8f9fa;
          border-radius: 16px;
          padding: 25px;
          margin-bottom: 25px;
        }

        .info-group {
          display: flex;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }

        .info-group:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .info-label {
          flex: 0 0 100px;
          font-weight: 600;
          color: #666;
          font-size: 0.95rem;
        }

        .info-value {
          flex: 1;
          color: #111;
          font-size: 1rem;
          word-break: break-word;
        }

        .role-badge {
          display: inline-block;
          background-color: #f5c518;
          color: #111;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: bold;
        }

        .profile-actions {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }

        .action-button {
          flex: 1;
          padding: 12px 20px;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .edit-button {
          background: linear-gradient(135deg, #f5c518 0%, #e6b800 100%);
          color: #111;
        }

        .edit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(245, 197, 24, 0.4);
        }

        .logout-button {
          background: linear-gradient(135deg, #ff4757 0%, #ee3a4a 100%);
          color: white;
        }

        .logout-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255, 71, 87, 0.4);
        }

        .profile-footer {
          text-align: center;
          padding-top: 15px;
          border-top: 1px solid #f0f0f0;
        }

        .footer-text {
          color: #999;
          font-size: 0.85rem;
        }

        .user-id {
          color: #666;
          font-family: monospace;
        }

        /* Планшеты */
        @media (max-width: 768px) {
          .profile-page {
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          .profile-container {
            padding: 25px;
          }

          .profile-header {
            gap: 15px;
          }

          .profile-avatar {
            width: 60px;
            height: 60px;
            font-size: 1.8rem;
          }

          .profile-info {
            padding: 20px;
          }

          .info-group {
            flex-direction: column;
            gap: 5px;
          }

          .info-label {
            flex: none;
            font-size: 0.9rem;
          }

          .profile-actions {
            flex-direction: column;
          }
        }

        /* Маленькие телефоны */
        @media (max-width: 480px) {
          .profile-container {
            padding: 20px;
          }

          .profile-header {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }

          .profile-avatar {
            width: 80px;
            height: 80px;
            font-size: 2.2rem;
          }

          .profile-title {
            font-size: 1.8rem;
          }

          .profile-info {
            padding: 15px;
          }

          .info-value {
            font-size: 0.95rem;
          }

          .action-button {
            padding: 10px;
            font-size: 0.95rem;
          }
        }

        /* Очень маленькие телефоны */
        @media (max-width: 360px) {
          .profile-container {
            padding: 15px;
          }

          .profile-avatar {
            width: 70px;
            height: 70px;
            font-size: 2rem;
          }

          .profile-title {
            font-size: 1.5rem;
          }

          .info-label {
            font-size: 0.85rem;
          }

          .info-value {
            font-size: 0.9rem;
          }

          .action-button {
            font-size: 0.9rem;
            padding: 8px;
          }
        }

        /* Для устройств с сенсорным экраном */
        @media (hover: none) and (pointer: coarse) {
          .action-button:hover {
            transform: none;
          }

          .action-button:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </div>
  );
}