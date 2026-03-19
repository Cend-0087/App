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
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Восстановление пароля</h1>
        </div>

        {message && (
          <div className="auth-success">{message}</div>
        )}

        {error && (
          <div className="auth-error">{error}</div>
        )}

        {!message && (
          <form onSubmit={handleSubmit} className="auth-form">
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
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Отправляем...' : 'Отправить письмо'}
            </button>
          </form>
        )}

        <div className="auth-footer">
          <a href="/login" className="link">← Вернуться ко входу</a>
        </div>
      </div>

      <style>{`
        .auth-page {
          min-height: calc(100vh - 140px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 16px;
          background: linear-gradient(135deg, #f8f9fc 0%, #eef2ff 100%);
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
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
          margin-bottom: 28px;
        }

        .auth-header h1 {
          font-size: 1.9rem;
          font-weight: 700;
          color: #0f1419;
          margin: 0;
        }

        .auth-error {
          background: #ffebee;
          color: #c62828;
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 24px;
          font-size: 0.94rem;
          text-align: center;
          border: 1px solid #ffcdd2;
        }

        .auth-success {
          background: #ecfdf5;
          color: #065f46;
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 24px;
          font-size: 0.94rem;
          text-align: center;
          border: 1px solid #a7f3d0;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-field label {
          font-size: 0.94rem;
          font-weight: 600;
          color: #444;
        }

        .form-field input {
          padding: 14px 16px;
          font-size: 1rem;
          border: 1px solid #d0d7e0;
          border-radius: 10px;
          background: #fafbfc;
          transition: all 0.2s ease;
        }

        .form-field input:focus {
          outline: none;
          border-color: #f5c518;
          background: white;
          box-shadow: 0 0 0 3px rgba(245, 197, 24, 0.18);
        }

        .form-field input::placeholder {
          color: #a0aec0;
        }

        .btn {
          padding: 14px 24px;
          font-size: 1.02rem;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.22s ease;
          border: none;
        }

        .btn-primary {
          background: linear-gradient(135deg, #f5d24a 0%, #f0c010 100%);
          color: #111;
          box-shadow: 0 4px 14px rgba(245, 197, 24, 0.3);
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245, 197, 24, 0.4);
        }

        .btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          box-shadow: none;
        }

        .auth-footer {
          margin-top: 28px;
          text-align: center;
          font-size: 0.94rem;
        }

        .link {
          color: #f5c518;
          text-decoration: none;
          font-weight: 500;
        }

        .link:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 32px 24px;
          }
          .auth-header h1 {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </div>
  );
}