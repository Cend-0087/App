import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const accessToken = searchParams.get('access_token');
    const type = searchParams.get('type');

    useEffect(() => {
        if (!accessToken || type !== 'recovery') {
            setError('Неверная или устаревшая ссылка восстановления');
        }
    }, [accessToken, type]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Пароль должен быть минимум 6 символов');
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: password,
            });

            if (error) throw error;

            setMessage('Пароль успешно изменён');
            setTimeout(() => {
                navigate('/login');
            }, 2500);
        } catch (err) {
            setError(err.message || 'Не удалось обновить пароль');
        } finally {
            setLoading(false);
        }
    };

    if (error && !accessToken) {
        return (
            <div className="login-page">
                <div className="login-container">
                    <h1 className="login-title">Ошибка</h1>
                    <div className="login-error">{error}</div>
                    <div className="login-links">
                        <a href="/forgot-password" className="forgot-link">Попробовать снова</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">Новый пароль</h1>

                {message && <div className="success-message">{message}</div>}
                {error && <div className="login-error">{error}</div>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Новый пароль</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Введите новый пароль"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Подтверждение</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Повторите пароль"
                            className="form-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? 'Сохранение...' : 'Сохранить новый пароль'}
                        </button>
                    </div>
                </form>

                <div className="login-links">
                    <a href="/login" className="forgot-link">Вернуться ко входу</a>
                </div>
            </div>
        </div>
    );
}