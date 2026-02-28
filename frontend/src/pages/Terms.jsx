import React from "react"

export default function Terms() {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1 className="terms-title">Условия использования</h1>
        
        <div className="terms-content">
          <div className="terms-intro">
            <p className="intro-text">
              Используя наш сайт, вы соглашаетесь с настоящими условиями. 
              Если вы не согласны с каким-либо из положений, пожалуйста, 
              прекратите использование сайта.
            </p>
          </div>

          <section className="terms-section">
            <h2 className="section-title">1. Общие положения</h2>
            <p className="section-text">
              Kybrak Motors предоставляет информацию об автомобилях, услугах и новостях компании. 
              Вся информация представлена исключительно в ознакомительных целях и не является 
              публичной офертой.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="section-title">2. Права и обязанности пользователей</h2>
            <p className="section-text">
              Пользователи обязуются не использовать сайт для распространения вредоносных данных, 
              спама, а также любой информации, нарушающей закон или права третьих лиц. 
              Запрещено копирование материалов сайта в коммерческих целях без согласования 
              с администрацией.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="section-title">3. Интеллектуальная собственность</h2>
            <p className="section-text">
              Все материалы сайта, включая текст, изображения, логотипы и дизайн, 
              являются собственностью Kybrak Motors и защищены авторским правом. 
              Любое использование материалов без письменного разрешения запрещено.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="section-title">4. Изменения условий</h2>
            <p className="section-text">
              Kybrak Motors оставляет за собой право вносить изменения в условия использования 
              без предварительного уведомления. Актуальная версия всегда доступна на этой странице.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="section-title">5. Ответственность</h2>
            <p className="section-text">
              Компания не несет ответственности за возможные убытки, связанные с использованием 
              информации, представленной на сайте. Мы стремимся к точности данных, но не гарантируем 
              их абсолютную достоверность.
            </p>
          </section>

          <div className="terms-footer">
            <div className="footer-note">
              <p>Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
              <p className="contact-note">
                По вопросам использования обращайтесь: {' '}
                <a href="mailto:legal@kybrakmotors.com" className="contact-email">
                  legal@kybrakmotors.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .terms-page {
          background-color: #f8f9fa; /* Светло-серый фон как на других страницах */
          min-height: calc(100vh - 200px);
          padding: 40px 20px;
        }

        .terms-container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          padding: clamp(30px, 5vw, 50px);
        }

        .terms-title {
          font-size: clamp(2rem, 5vw, 2.5rem);
          color: #111;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 3px solid #f5c518;
          font-weight: bold;
        }

        .terms-content {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .terms-intro {
          background-color: #f8f9fa; /* Светло-серый фон как в Privacy */
          padding: 25px;
          border-radius: 16px;
          border-left: 4px solid #f5c518;
          margin-bottom: 10px;
        }

        .intro-text {
          font-size: clamp(1rem, 3vw, 1.1rem);
          line-height: 1.7;
          color: #444;
          margin: 0;
        }

        .terms-section {
          transition: transform 0.3s ease;
        }

        .terms-section:hover {
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

        .terms-footer {
          margin-top: 40px;
          padding-top: 25px;
          border-top: 1px solid #eee;
        }

        .footer-note {
          color: #666;
          font-size: 0.95rem;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-note p {
          margin: 0;
        }

        .contact-note {
          font-size: 0.95rem;
        }

        .contact-email {
          color: #f5c518;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
          word-break: break-all;
        }

        .contact-email:hover {
          color: #e6b800;
          text-decoration: underline;
        }

        /* Планшеты */
        @media (max-width: 992px) {
          .terms-page {
            padding: 30px 20px;
          }

          .terms-container {
            padding: 40px 30px;
          }
        }

        /* Мобильные */
        @media (max-width: 768px) {
          .terms-page {
            padding: 20px 15px;
          }

          .terms-container {
            padding: 30px 20px;
          }

          .terms-title {
            font-size: 2rem;
          }

          .terms-intro {
            padding: 20px;
          }

          .terms-section:hover {
            transform: none;
          }
        }

        /* Маленькие телефоны */
        @media (max-width: 480px) {
          .terms-page {
            padding: 15px 10px;
          }

          .terms-container {
            padding: 25px 15px;
          }

          .terms-title {
            font-size: 1.8rem;
          }

          .intro-text {
            font-size: 0.95rem;
          }

          .section-title {
            font-size: 1.3rem;
          }

          .section-text {
            font-size: 0.9rem;
          }
        }

        /* Очень маленькие телефоны */
        @media (max-width: 360px) {
          .terms-container {
            padding: 20px 12px;
          }

          .terms-title {
            font-size: 1.6rem;
          }
        }

        /* Для печати */
        @media print {
          .terms-page {
            background: white;
            padding: 0;
          }

          .terms-container {
            box-shadow: none;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  )
}