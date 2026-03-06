import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setLoading(true);

    const { success, error } = await signUp(name.trim(), email.trim(), password);

    setLoading(false);

    if (success) {
      // Можно редиректить на /profile, если email confirmation выключен
      // Или на /login с сообщением "Проверьте почту"
      navigate('/login');
      // alert('Регистрация успешна! Теперь можете войти.');
    } else {
      setError(error || 'Ошибка регистрации');
    }
  };

  return (
    <div className="login-page">  {/* используем тот же класс для фона */}
      <div className="login-container">  {/* переиспользуем контейнер */}
        <h1 className="login-title">Регистрация</h1>  {/* было register-title */}

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>  {/* переиспользуем классы */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Имя</label>
            <input
              id="name"
              type="text"
              placeholder="Введите ваше имя"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Придумайте пароль"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
            <span className="input-hint">Минимум 6 символов</span>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Подтверждение пароля</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Повторите пароль"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="login-button"  // можно сделать register-button, но для единообразия оставим
              disabled={loading}
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </div>

          <div className="register-links">
            <span className="login-text">Уже есть аккаунт?</span>
            <a className="login-link" href="/login">Войти</a>
          </div>
        </form>
      </div>

      {/* Стили те же, что и в Login — можно вынести в отдельный файл позже */}
      <style>{`
        /* Вставьте сюда весь CSS из Login.jsx */
        /* + небольшие дополнения, если нужно */
        .input-hint {
          font-size: 0.82rem;
          color: #777;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
}