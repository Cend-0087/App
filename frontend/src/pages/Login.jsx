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
    setLoading(true);

    const { success, error } = await signIn(email.trim(), password);

    setLoading(false);

    if (success) {
      navigate('/profile');
    } else {
      setError(error || 'Неверный email или пароль');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Вход</h1>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Введите ваш email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input
              id="password"
              type="password"
              placeholder="Введите пароль"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
            <a href="/register" className="register-button">
              Регистрация
            </a>
          </div>
        </form>

        <div className="login-links">
          <a href="/forgot-password" className="forgot-link">
            Забыли пароль?
          </a>
        </div>
      </div>

      {/* Ваш стиль остаётся без изменений */}
      <style>{`
        /* ... весь ваш CSS из предыдущей версии Login.jsx ... */
      `}</style>
    </div>
  );
}