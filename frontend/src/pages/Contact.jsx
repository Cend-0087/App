import React from "react"

export default function Contact() {
  return (
    <div className="contact-page">
      <h1 className="contact-title">Контакты</h1>
      <p className="contact-subtitle">
        Свяжитесь с нами по любым вопросам — мы всегда рады помочь!
      </p>

      <div className="contact-info">
        <div className="info-item">
          <span className="info-label">Телефон:</span>
          <a href="tel:+74951234567" className="info-value">
            +7 (495) 123-45-67
          </a>
        </div>
        <div className="info-item">
          <span className="info-label">Email:</span>
          <a href="mailto:support@auroramotors.com" className="info-value">
            support@auroramotors.com
          </a>
        </div>
        <div className="info-item">
          <span className="info-label">Адрес:</span>
          <span className="info-value">Москва, ул. Инноваций, 15, офис 204</span>
        </div>
      </div>

      <h2 className="form-title">Форма обратной связи</h2>
      <form className="contact-form">
        <input 
          type="text" 
          placeholder="Ваше имя" 
          required 
          className="form-input"
        />
        <input 
          type="email" 
          placeholder="Email" 
          required 
          className="form-input"
        />
        <textarea 
          placeholder="Сообщение" 
          rows="4" 
          required
          className="form-textarea"
        ></textarea>
        <button type="submit" className="form-button">
          Отправить
        </button>
      </form>

      <style>{`
        .contact-page {
          max-width: 800px;
          margin: 40px auto;
          padding: 0 20px;
          color: #222;
        }

        .contact-title {
          font-size: clamp(2rem, 5vw, 2.5rem);
          margin-bottom: 15px;
          color: #111;
          line-height: 1.2;
        }

        .contact-subtitle {
          font-size: clamp(1rem, 3vw, 1.1rem);
          margin-bottom: 30px;
          color: #666;
          line-height: 1.6;
        }

        /* Контактная информация */
        .contact-info {
          background-color: #f8f8f8;
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 40px;
          border: 1px solid #eee;
        }

        .info-item {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 15px;
          font-size: clamp(1rem, 3vw, 1.1rem);
        }

        .info-item:last-child {
          margin-bottom: 0;
        }

        .info-label {
          font-weight: bold;
          color: #111;
          min-width: 80px;
        }

        .info-value {
          color: #333;
          text-decoration: none;
          transition: color 0.3s ease;
          word-break: break-word; /* Перенос длинных слов */
        }

        /* Ссылки в контактах */
        a.info-value {
          color: #f5c518;
        }

        a.info-value:hover {
          color: #e6b800;
          text-decoration: underline;
        }

        /* Форма */
        .form-title {
          font-size: clamp(1.5rem, 4vw, 2rem);
          margin-bottom: 20px;
          color: #111;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-width: 500px;
          width: 100%;
        }

        .form-input,
        .form-textarea {
          padding: 12px 15px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          transition: all 0.3s ease;
          background-color: white;
          width: 100%;
          box-sizing: border-box; /* Важно для правильных отступов */
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
          font-family: inherit;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #f5c518;
          box-shadow: 0 0 0 3px rgba(245, 197, 24, 0.1);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #999;
        }

        .form-button {
          padding: 14px 20px;
          border: none;
          border-radius: 8px;
          background-color: #f5c518;
          color: #111;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          max-width: 200px;
        }

        .form-button:hover {
          background-color: #e6b800;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .form-button:active {
          transform: translateY(0);
        }

        /* Планшеты */
        @media (max-width: 992px) {
          .contact-page {
            margin: 35px auto;
          }

          .contact-info {
            padding: 20px;
          }
        }

        /* Мобильные */
        @media (max-width: 768px) {
          .contact-page {
            margin: 30px auto;
            padding: 0 15px;
          }

          .contact-title {
            margin-bottom: 10px;
          }

          .contact-subtitle {
            margin-bottom: 25px;
          }

          .contact-info {
            padding: 20px 15px;
            margin-bottom: 30px;
          }

          .info-item {
            flex-direction: column;
            gap: 5px;
            margin-bottom: 20px;
          }

          .info-item:last-child {
            margin-bottom: 0;
          }

          .info-label {
            min-width: auto;
            font-size: 0.95rem;
          }

          .info-value {
            font-size: 1rem;
            padding-left: 10px;
          }

          .form-button {
            max-width: 100%;
          }
        }

        /* Маленькие телефоны */
        @media (max-width: 480px) {
          .contact-page {
            margin: 20px auto;
          }

          .contact-title {
            font-size: 1.8rem;
          }

          .contact-subtitle {
            font-size: 0.95rem;
          }

          .contact-info {
            padding: 15px 12px;
          }

          .info-item {
            margin-bottom: 15px;
          }

          .info-label {
            font-size: 0.9rem;
          }

          .info-value {
            font-size: 0.95rem;
            word-break: break-all; /* Для очень длинных email */
          }

          .form-title {
            font-size: 1.5rem;
          }

          .form-input,
          .form-textarea {
            padding: 10px 12px;
            font-size: 0.95rem;
          }

          .form-button {
            padding: 12px;
            font-size: 0.95rem;
          }
        }

        /* Очень маленькие телефоны */
        @media (max-width: 360px) {
          .contact-title {
            font-size: 1.5rem;
          }

          .contact-subtitle {
            font-size: 0.9rem;
          }

          .info-label {
            font-size: 0.85rem;
          }

          .info-value {
            font-size: 0.9rem;
          }

          .form-input,
          .form-textarea {
            padding: 8px 10px;
          }
        }

        /* Для touch-устройств */
        @media (hover: none) and (pointer: coarse) {
          .form-button:hover {
            transform: none;
            box-shadow: none;
          }

          .form-button:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </div>
  )
}