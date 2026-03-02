import React from "react"

export default function About() {
  return (
    <div className="about-page">
      <h1 className="about-title">О компании Kybrak Motors</h1>
      <div className="about-content">
        <p className="about-text">
          Kybrak Motors - инновационный производитель автомобилей нового поколения. 
          Мы сочетаем передовые технологии, элегантный дизайн и внимание к экологии, 
          чтобы создавать машины, которые вдохновляют.
        </p>
        <p className="about-text">
          Наша миссия — делать вождение не просто удобным, но и осознанным. 
          Мы верим, что автомобиль может быть не только средством передвижения, 
          но и частью вашего стиля жизни.
        </p>
        <p className="about-text">
          Сегодня Kybrak Motors активно развивается, открывая представительства по всему миру, 
          а также инвестируя в разработку электромобилей и систем автономного управления.
        </p>
      </div>

      <style>{`
        .about-page {
          max-width: 800px;
          margin: 40px auto;
          padding: 0 20px; /* Добавляем отступы по бокам */
          color: #222;
        }

        .about-title {
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          margin-bottom: 30px;
          color: #111;
          line-height: 1.2;
          font-weight: bold;
          text-align: center; /* Центрируем заголовок */
        }

        .about-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .about-text {
          font-size: clamp(1rem, 3vw, 1.1rem);
          line-height: 1.7;
          margin: 0;
          color: #333;
        }

        /* Десктопы */
        @media (max-width: 1200px) {
          .about-page {
            margin: 35px auto;
          }
        }

        /* Планшеты */
        @media (max-width: 992px) {
          .about-page {
            margin: 30px auto;
            padding: 0 25px;
          }

          .about-title {
            margin-bottom: 25px;
          }
        }

        /* Мобильные */
        @media (max-width: 768px) {
          .about-page {
            margin: 25px auto;
            padding: 0 20px;
          }

          .about-title {
            font-size: 1.8rem;
            margin-bottom: 20px;
          }

          .about-content {
            gap: 18px;
          }

          .about-text {
            font-size: 1rem;
            line-height: 1.6;
          }
        }

        /* Маленькие телефоны */
        @media (max-width: 480px) {
          .about-page {
            margin: 20px auto;
            padding: 0 15px;
          }

          .about-title {
            font-size: 1.5rem;
            margin-bottom: 18px;
          }

          .about-content {
            gap: 15px;
          }

          .about-text {
            font-size: 0.95rem;
            line-height: 1.5;
          }
        }

        /* Очень маленькие телефоны */
        @media (max-width: 360px) {
          .about-page {
            margin: 15px auto;
            padding: 0 12px;
          }

          .about-title {
            font-size: 1.3rem;
            margin-bottom: 15px;
          }

          .about-text {
            font-size: 0.9rem;
          }
        }

        /* Для лучшей читаемости на больших экранах */
        @media (min-width: 1600px) {
          .about-page {
            max-width: 900px;
            margin: 50px auto;
          }

          .about-title {
            font-size: 3rem;
          }

          .about-text {
            font-size: 1.2rem;
            line-height: 1.8;
          }
        }
      `}</style>
    </div>
  )
}

