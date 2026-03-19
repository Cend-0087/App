// src/components/FormError.jsx
import PropTypes from 'prop-types';

export default function FormError({ error, className = '' }) {
    if (!error) return null;

    return (
        <div
            className={`auth-error ${className}`}
            role="alert"
            aria-live="assertive"
        >
            {error}
        </div>
    );
}

FormError.propTypes = {
    error: PropTypes.string,
    className: PropTypes.string,
};

const styles = `
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
`;

export function FormErrorStyles() {
    return <style>{styles}</style>;
}