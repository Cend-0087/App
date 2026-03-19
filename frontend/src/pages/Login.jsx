import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await signIn(email.trim(), password);

      if (!result.success) {
        // Если ошибка — сразу бросаем её, чтобы попасть в catch
        throw new Error(result.error || 'Ошибка! ');
      }
      // Если всё ок — только тогда редирект
      navigate('/profile');
    } catch (err) {
      if (err.message.includes("Invalid login credentials")) {
        setError("Неправильный логин или пароль")
      }
      else {
        // Устанавливаем текст ошибки в состояние для UI
        setError(err.message);
      }
      console.log("Ошибка для логов:", err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Вход в аккаунт</h1>
        </div>

        {/* Вот здесь теперь отображаем ошибку */}
        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="mail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              placeholder="········"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Входим...' : 'Войти'}
          </button>

          <div className="auth-footer">
            <a href="/register" className="link">Нет аккаунта? Зарегистрироваться</a>
            <a href="/forgot-password" className="link secondary">Забыли пароль?</a>
          </div>
        </form>
      </div>
      <style>{`
  .auth-page {
    min-height: calc(100vh - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 16px;
    background: linear-gradient(135deg, #f8f9fc 0%, #eef2ff 100%);
  }

  .auth-card {
    width: 100%;
    max-width: 440px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06);
    padding: 40px 32px;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }

  .auth-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.1);
  }

  .auth-header {
    text-align: center;
    margin-bottom: 1.8rem;
  }

  .auth-header h1 {
    font-size: clamp(1.8rem, 5.5vw, 2.1rem);
    font-weight: 700;
    color: #0f1419;
    margin: 0;
  }

  .auth-error {
    background: #fee2e2;
    color: #991b1b;
    padding: 14px 18px;
    border-radius: 12px;
    margin: 0 0 1.8rem 0;
    font-size: 0.97rem;
    text-align: center;
    border: 1px solid #fecaca;
    line-height: 1.45;
    font-weight: 500;
  }

  .form-field {
    margin-bottom: 1.4rem;
  }

  .form-field label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.96rem;
    font-weight: 600;
    color: #444;
  }

  .form-field input {
    width: 100%;
    padding: 14px 16px;
    font-size: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    background: #f9fafb;
    transition: all 0.2s ease;
  }

  .form-field input:focus {
    outline: none;
    border-color: #f5c518;
    background: white;
    box-shadow: 0 0 0 3px rgba(245, 197, 24, 0.18);
  }

  .form-field input::placeholder {
    color: #9ca3af;
  }

  .form-field input:disabled {
    background: #f3f4f6;
    opacity: 0.7;
    cursor: not-allowed;
  }

  .btn {
    width: 100%;
    padding: 14px 24px;
    font-size: 1.03rem;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.22s ease;
    border: none;
  }

  .btn-primary {
    background: linear-gradient(135deg, #f5d24a 0%, #f0c010 100%);
    color: #111;
    box-shadow: 0 4px 14px rgba(245, 197, 24, 0.28);
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(245, 197, 24, 0.38);
  }

  .btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    box-shadow: none;
  }

  .auth-footer {
    margin-top: 1.8rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    font-size: 0.96rem;
    color: #4b5563;
  }

  .link {
    color: #f5c518;
    text-decoration: none;
    font-weight: 500;
  }

  .link:hover {
    text-decoration: underline;
  }

  .link.secondary {
    color: #6b7280;
  }

  /* Адаптивность */
  @media (max-width: 480px) {
    .auth-card {
      padding: 32px 24px;
      border-radius: 16px;
    }

    .auth-header h1 {
      font-size: 1.75rem;
    }

    .auth-error {
      padding: 12px 16px;
      font-size: 0.94rem;
    }

    .form-field input {
      padding: 13px 15px;
    }

    .btn {
      padding: 13px 20px;
      font-size: 1rem;
    }
  }
`}</style>
    </div>
  );
}