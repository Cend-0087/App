import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;

            setMessage('Письмо с инструкцией отправлено на вашу почту');
        } catch (err) {
            setError(err.message || 'Не удалось отправить письмо');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">Восстановление пароля</h1>

                {message && <div className="success-message">{message}</div>}
                {error && <div className="login-error">{error}</div>}

                {!message && (
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

                        <div className="form-actions">
                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >
                                {loading ? 'Отправка...' : 'Отправить письмо'}
                            </button>
                        </div>
                    </form>
                )}

                <div className="login-links">
                    <a href="/login" className="forgot-link">Вернуться ко входу</a>
                </div>
            </div>

            <style>{`
        .success-message {
          background-color: #e6ffed;
          color: #006d32;
          padding: 12px 15px;
          border-radius: 10px;
          margin-bottom: 20px;
          border: 1px solid #b3f0c2;
          font-size: 0.95rem;
          text-align: center;
        }
        /* Остальные стили можно взять из Login.jsx */
      `}</style>
        </div>
    );
}