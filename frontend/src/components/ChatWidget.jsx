import React, { useState, useRef, useEffect } from 'react';

export default function ChatWidget() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Здравствуйте! Чем могу помочь?',
      sender: 'bot',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const closeTimeout = useRef(null);

  const telegramUrl = 'https://t.me/KybrakMotors_bot';

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        text: 'Спасибо за сообщение! Скоро с вами свяжется наш специалист. Вы также можете написать нам в Telegram.',
        sender: 'bot',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
    }, 800);
  };

  const openMenu = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    closeTimeout.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 150);
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
    setIsMenuOpen(false);
  };

  return (
    <div className="chat-widget">
      {/* Панель чата */}
      {isChatOpen && (
        <div className="chat-panel">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">K</div>
              <div>
                <div className="chat-title">Kybrak Support</div>
                <div className="chat-status">Онлайн</div>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsChatOpen(false)}>
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`message ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}
              >
                <div className="message-bubble">
                  {msg.text}
                </div>
                <div className="message-time">{msg.time}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Напишите сообщение..."
              className="chat-input"
            />
            <button type="submit" className="chat-send" disabled={!inputValue.trim()}>
              ➤
            </button>
          </form>
        </div>
      )}

      {/* Кнопка + столбец с иконками */}
      <div
        className="chat-button-wrapper"
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
      >
        {/* Столбец с дополнительными иконками */}
        <div className={`chat-column ${isMenuOpen && !isChatOpen ? 'open' : ''}`}>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="column-item"
            title="Telegram"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#0088cc">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.822 8.594c-.137.604-.45.753-.912.47l-2.52-1.86-1.216 1.17c-.135.135-.248.248-.508.248l.178-2.52 4.594-4.148c.2-.178-.044-.278-.31-.1l-5.683 3.58-2.45-.818c-.533-.178-.544-.532.112-.788l9.58-3.693c.442-.16.83.106.686.786z"/>
            </svg>
          </a>
          {/* Сюда потом можно добавить WhatsApp и другие иконки */}
        </div>

        {/* Основная кнопка */}
        <button
          className={`chat-main-button ${isChatOpen ? 'active' : ''}`}
          onClick={toggleChat}
          aria-label="Открыть чат"
        >
          {isChatOpen ? (
            <span className="close-icon">×</span>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>
      </div>

      <style>{`
        .chat-widget {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          font-family: sans-serif;
        }

        .chat-button-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Столбец с иконками */
        .chat-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          background: white;
          border-radius: 30px;
          padding: 10px 0;
          width: 60px;
          margin-bottom: 10px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.12);
          opacity: 0;
          transform: translateY(15px) scale(0.9);
          pointer-events: none;
          transition: all 0.25s ease;
        }

        .chat-column.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .column-item {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .column-item:hover {
          background: #f0f7ff;
          transform: scale(1.1);
        }

        /* Основная кнопка */
        .chat-main-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f5c518 0%, #e6b800 100%);
          border: none;
          color: #111;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(245, 197, 24, 0.4);
          transition: all 0.3s ease;
        }

        .chat-main-button:hover {
          transform: scale(1.06);
          box-shadow: 0 6px 25px rgba(245, 197, 24, 0.5);
        }

        .chat-main-button.active {
          background: #333;
          color: white;
        }

        .close-icon {
          font-size: 32px;
          line-height: 1;
          font-weight: 300;
        }

        /* Панель чата */
        .chat-panel {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 360px;
          height: 480px;
          background: white;
          border-radius: 18px;
          box-shadow: 0 15px 50px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.25s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chat-header {
          background: linear-gradient(135deg, #f5c518 0%, #e6b800 100%);
          padding: 16px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #111;
        }

        .chat-header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chat-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #111;
          color: #f5c518;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .chat-title {
          font-weight: 700;
          font-size: 1.05rem;
        }

        .chat-status {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .chat-close {
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: #111;
          line-height: 1;
          padding: 0 4px;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #f8f9fa;
        }

        .message {
          display: flex;
          flex-direction: column;
          max-width: 80%;
        }

        .message-user {
          align-self: flex-end;
        }

        .message-bot {
          align-self: flex-start;
        }

        .message-bubble {
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 0.95rem;
          line-height: 1.4;
        }

        .message-user .message-bubble {
          background: #f5c518;
          color: #111;
          border-bottom-right-radius: 4px;
        }

        .message-bot .message-bubble {
          background: white;
          color: #222;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }

        .message-time {
          font-size: 0.7rem;
          color: #999;
          margin-top: 4px;
          padding: 0 4px;
        }

        .message-user .message-time {
          text-align: right;
        }

        .chat-input-area {
          display: flex;
          gap: 8px;
          padding: 14px;
          background: white;
          border-top: 1px solid #eee;
        }

        .chat-input {
          flex: 1;
          padding: 11px 14px;
          border: 1px solid #ddd;
          border-radius: 25px;
          font-size: 0.95rem;
          outline: none;
        }

        .chat-input:focus {
          border-color: #f5c518;
        }

        .chat-send {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #f5c518;
          border: none;
          color: #111;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .chat-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .chat-send:not(:disabled):hover {
          background: #e6b800;
          transform: scale(1.05);
        }

        /* Адаптивность */
        @media (max-width: 480px) {
          .chat-widget {
            bottom: 18px;
            right: 18px;
          }

          .chat-main-button {
            width: 52px;
            height: 52px;
          }

          .chat-column {
            width: 52px;
          }

          .chat-panel {
            width: calc(100vw - 36px);
            height: 70vh;
            bottom: 70px;
            right: 0;
          }
        }
      `}</style>
    </div>
  );
}