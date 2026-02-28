import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Ошибка входа")

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      alert("Вход выполнен успешно!")
      navigate("/profile")
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Вход</h1>
        
        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
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
              placeholder="Введите пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? "Вход..." : "Войти"}
            </button>
            <Link to="/register" className="register-button">
              Регистрация
            </Link>
          </div>
        </form>

        <div className="login-links">
          <Link to="/forgot-password" className="forgot-link">
            Забыли пароль?
          </Link>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
        }

        .login-container {
          max-width: 450px;
          width: 100%;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: clamp(25px, 5vw, 40px);
          transition: transform 0.3s ease;
        }

        .login-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .login-title {
          font-size: clamp(1.8rem, 5vw, 2.2rem);
          color: #111;
          margin-bottom: 10px;
          text-align: center;
          font-weight: bold;
        }

        .login-error {
          background-color: #fee;
          color: #c00;
          padding: 12px 15px;
          border-radius: 10px;
          margin-bottom: 20px;
          border: 1px solid #fcc;
          font-size: 0.95rem;
          text-align: center;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
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

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        .login-button {
          flex: 1;
          padding: 14px 20px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #f5c518 0%, #e6b800 100%);
          color: #111;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(245, 197, 24, 0.4);
        }

        .login-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .register-button {
          flex: 1;
          padding: 14px 20px;
          border-radius: 12px;
          border: 2px solid #f5c518;
          background-color: transparent;
          color: #f5c518;
          text-decoration: none;
          text-align: center;
          font-weight: bold;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .register-button:hover {
          background-color: #f5c518;
          color: #111;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(245, 197, 24, 0.2);
        }

        .register-button:active {
          transform: translateY(0);
        }

        .login-links {
          margin-top: 20px;
          text-align: center;
        }

        .forgot-link {
          color: #666;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .forgot-link:hover {
          color: #f5c518;
          text-decoration: underline;
        }

        /* Планшеты */
        @media (max-width: 768px) {
          .login-page {
            padding: 15px;
            min-height: calc(100vh - 150px);
          }

          .login-container {
            padding: 30px 25px;
          }

          .form-actions {
            flex-direction: column;
          }

          .login-button,
          .register-button {
            width: 100%;
          }
        }

        /* Маленькие телефоны */
        @media (max-width: 480px) {
          .login-page {
            padding: 10px;
            min-height: calc(100vh - 120px);
          }

          .login-container {
            padding: 25px 20px;
          }

          .login-title {
            font-size: 1.8rem;
            margin-bottom: 5px;
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

          .login-button,
          .register-button {
            padding: 12px;
            font-size: 0.95rem;
          }

          .forgot-link {
            font-size: 0.85rem;
          }
        }

        /* Очень маленькие телефоны */
        @media (max-width: 360px) {
          .login-container {
            padding: 20px 15px;
          }

          .login-title {
            font-size: 1.6rem;
          }

          .form-input {
            padding: 8px 10px;
            font-size: 0.9rem;
          }

          .login-button,
          .register-button {
            padding: 10px;
            font-size: 0.9rem;
          }
        }

        /* Для устройств с сенсорным экраном */
        @media (hover: none) and (pointer: coarse) {
          .login-button:hover:not(:disabled),
          .register-button:hover {
            transform: none;
          }

          .login-button:active:not(:disabled) {
            transform: scale(0.98);
          }
        }
      `}</style>
    </div>
  )
}