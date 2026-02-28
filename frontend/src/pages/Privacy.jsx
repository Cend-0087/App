import React from "react"

export default function Privacy() {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <h1 className="privacy-title">Политика конфиденциальности</h1>
        
        <div className="privacy-content">
          <p className="privacy-intro">
            Настоящая Политика конфиденциальности описывает, как Kybrak Motors 
            собирает, использует и защищает персональные данные пользователей сайта.
          </p>

          <section className="privacy-section">
            <h2 className="section-title">1. Сбор информации</h2>
            <p className="section-text">
              Мы можем собирать персональные данные, такие как имя, адрес электронной почты, 
              номер телефона и другую информацию, предоставленную пользователем при регистрации, 
              оформлении заказа или обращении в службу поддержки.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="section-title">2. Использование информации</h2>
            <p className="section-text">
              Собранные данные используются исключительно для улучшения сервиса, 
              обработки запросов и предоставления актуальной информации о наших продуктах.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="section-title">3. Защита данных</h2>
            <p className="section-text">
              Мы применяем современные технические и организационные меры 
              для защиты персональных данных от несанкционированного доступа.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="section-title">4. Контактная информация</h2>
            <p className="section-text">
              По вопросам, связанным с обработкой данных, вы можете обратиться по адресу:{' '}
              <a href="mailto:privacy@kybrakmotors.com" className="privacy-email">
                privacy@kybrakmotors.com
              </a>
            </p>
          </section>

          <div className="privacy-footer">
            <p className="footer-note">
              Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .privacy-page {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          min-height: calc(100vh - 200px);
          padding: 40px 20px;
        }

        .privacy-container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          padding: clamp(30px, 5vw, 50px);
        }

        .privacy-title {
          font-size: clamp(2rem, 5vw, 2.5rem);
          color: #111;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 3px solid #f5c518;
          font-weight: bold;
        }

        .privacy-content {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .privacy-intro {
          font-size: clamp(1rem, 3vw, 1.1rem);
          line-height: 1.7;
          color: #444;
          background-color: #f8f9fa;
          padding: 20px 25px;
          border-radius: 16px;
          border-left: 4px solid #f5c518;
          margin-bottom: 10px;
        }

        .privacy-section {
          transition: transform 0.3s ease;
        }

        .privacy-section:hover {
          transform: translateX(5px);
        }

        .section-title {
          font-size: clamp(1.3rem, 4vw, 1.6rem);
          color: #222;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .section-text {
          font-size: clamp(0.95rem, 2.5vw, 1.05rem);
          line-height: 1.7;
          color: #444;
          margin-bottom: 0;
        }

        .privacy-email {
          color: #f5c518;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          word-break: break-all;
        }

        .privacy-email:hover {
          color: #e6b800;
          text-decoration: underline;
        }

        .privacy-footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          text-align: right;
        }

        .footer-note {
          font-size: 0.9rem;
          color: #888;
          font-style: italic;
        }

        /* Планшеты */
        @media (max-width: 992px) {
          .privacy-page {
            padding: 30px 20px;
          }

          .privacy-container {
            padding: 40px 30px;
          }

          .privacy-intro {
            padding: 15px 20px;
          }
        }

        /* Мобильные */
        @media (max-width: 768px) {
          .privacy-page {
            padding: 20px 15px;
            min-height: calc(100vh - 150px);
          }

          .privacy-container {
            padding: 30px 20px;
            border-radius: 20px;
          }

          .privacy-title {
            font-size: 2rem;
            margin-bottom: 25px;
            padding-bottom: 15px;
          }

          .privacy-intro {
            padding: 15px;
            font-size: 1rem;
          }

          .privacy-section:hover {
            transform: none;
          }

          .section-title {
            font-size: 1.4rem;
            margin-bottom: 12px;
          }

          .section-text {
            font-size: 0.95rem;
            line-height: 1.6;
          }
        }

        /* Маленькие телефоны */
        @media (max-width: 480px) {
          .privacy-page {
            padding: 15px 10px;
          }

          .privacy-container {
            padding: 25px 15px;
            border-radius: 16px;
          }

          .privacy-title {
            font-size: 1.8rem;
            margin-bottom: 20px;
            padding-bottom: 12px;
          }

          .privacy-content {
            gap: 20px;
          }

          .privacy-intro {
            padding: 12px;
            font-size: 0.95rem;
            border-left-width: 3px;
          }

          .section-title {
            font-size: 1.3rem;
            margin-bottom: 10px;
          }

          .section-text {
            font-size: 0.9rem;
            line-height: 1.5;
          }

          .privacy-footer {
            margin-top: 20px;
            padding-top: 15px;
          }

          .footer-note {
            font-size: 0.8rem;
          }
        }

        /* Очень маленькие телефоны */
        @media (max-width: 360px) {
          .privacy-container {
            padding: 20px 12px;
          }

          .privacy-title {
            font-size: 1.6rem;
          }

          .privacy-intro {
            padding: 10px;
            font-size: 0.9rem;
          }

          .section-title {
            font-size: 1.2rem;
          }

          .section-text {
            font-size: 0.85rem;
          }
        }

        /* Для лучшей читаемости на больших экранах */
        @media (min-width: 1400px) {
          .privacy-container {
            max-width: 1000px;
          }

          .privacy-title {
            font-size: 3rem;
          }

          .privacy-intro {
            font-size: 1.2rem;
            padding: 25px 30px;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .section-text {
            font-size: 1.1rem;
            line-height: 1.8;
          }
        }

        /* Для печати */
        @media print {
          .privacy-page {
            background: white;
            padding: 0;
          }

          .privacy-container {
            box-shadow: none;
            padding: 20px;
          }

          .privacy-email {
            color: black;
          }
        }
      `}</style>
    </div>
  )
}