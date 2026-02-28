import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Валидация паролей
    if (password !== confirmPassword) {
      setError("Пароли не совпадают")
      return
    }

    if (password.length < 6) {
      setError("Пароль должен быть не менее 6 символов")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Ошибка регистрации")
      
      alert("Регистрация успешна! Теперь вы можете войти.")
      navigate("/login")
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Регистрация</h1>
        
        {error && (
          <div className="register-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Имя</label>
            <input
              id="name"
              type="text"
              placeholder="Введите ваше имя"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Введите ваш email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input
              id="password"
              type="password"
              placeholder="Придумайте пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="form-input"
              disabled={isLoading}
              minLength={6}
            />
            <span className="input-hint">Минимум 6 символов</span>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Подтверждение пароля</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
          </div>

          <div className="register-links">
            <span className="login-text">Уже есть аккаунт?</span>
            <Link to="/login" className="login-link">
              Войти
            </Link>
          </div>
        </form>
      </div>

      <style>{`
        .register-page {
          background-color: #f8f9fa;
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .register-container {
          max-width: 450px;
          width: 100%;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          padding: clamp(25px, 5vw, 40px);
          transition: transform 0.3s ease;
        }

        .register-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .register-title {
          font-size: clamp(1.8rem, 5vw, 2.2rem);
          color: #111;
          margin-bottom: 10px;
          text-align: center;
          font-weight: bold;
          padding-bottom: 15px;
          border-bottom: 3px solid #f5c518;
        }

        .register-error {
          background-color: #fee;
          color: #c00;
          padding: 12px 15px;
          border-radius: 10px;
          margin: 20px 0;
          border: 1px solid #fcc;
          font-size: 0.95rem;
          text-align: center;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 0.95rem;
          font-weight: 600;
          color: #333;
        }

        .form-input {
          padding: 12px 15px;
          border-radius: 12px;
          border: 2px solid #e0e0e0;
          font-size: 1rem;
          transition: all 0.3s ease;
          background-color: #fafafa;
          width: 100%;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #f5c518;
          background-color: white;
          box-shadow: 0 0 0 3px rgba(245, 197, 24, 0.1);
        }

        .form-input::placeholder {
          color: #999;
        }

        .form-input:disabled {
          background-color: #f0f0f0;
          cursor: not-allowed;
        }

        .input-hint {
          font-size: 0.8rem;
          color: #888;
          margin-top: 4px;
        }

        .form-actions {
          margin-top: 10px;
        }

        .register-button {
          width: 100%;
          padding: 14px 20px;
          border-radius: 12px;
          border: none;
          background-color: #f5c518;
          color: #111;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .register-button:hover:not(:disabled) {
          background-color: #e6b800;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(245, 197, 24, 0.3);
        }

        .register-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .register-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .register-links {
          margin-top: 20px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }

        .login-text {
          color: #666;
          font-size: 0.95rem;
        }

        .login-link {
          color: #f5c518;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }

        .login-link:hover {
          color: #e6b800;
          text-decoration: underline;
        }

        /* Планшеты */
        @media (max-width: 768px) {
          .register-page {
            padding: 15px;
          }

          .register-container {
            padding: 30px 25px;
          }

          .form-input {
            padding: 12px;
          }
        }

        /* Маленькие телефоны */
        @media (max-width: 480px) {
          .register-page {
            padding: 10px;
          }

          .register-container {
            padding: 25px 20px;
          }

          .register-title {
            font-size: 1.8rem;
          }

          .form-group {
            gap: 6px;
          }

          .form-label {
            font-size: 0.9rem;
          }

          .form-input {
            padding: 10px 12px;
            font-size: 0.95rem;
          }

          .register-button {
            padding: 12px;
            font-size: 0.95rem;
          }

          .login-text,
          .login-link {
            font-size: 0.9rem;
          }
        }

        /* Очень маленькие телефоны */
        @media (max-width: 360px) {
          .register-container {
            padding: 20px 15px;
          }

          .register-title {
            font-size: 1.6rem;
          }

          .form-input {
            padding: 8px 10px;
            font-size: 0.9rem;
          }

          .register-button {
            padding: 10px;
            font-size: 0.9rem;
          }
        }

        /* Для устройств с сенсорным экраном */
        @media (hover: none) and (pointer: coarse) {
          .register-button:hover:not(:disabled) {
            transform: none;
          }

          .register-button:active:not(:disabled) {
            transform: scale(0.98);
          }
        }
      `}</style>
    </div>
  )
}