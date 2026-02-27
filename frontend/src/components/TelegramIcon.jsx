import React from 'react';

const TelegramIcon = () => {
    const telegramUrl = "https://t.me/KybrakMotors_bot";

    const linkStyles = {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 1000,
        color: '#0088cc',
        transition: 'transform 0.3s ease',
        textDecoration: 'none',
        display: 'block',
        '@media (max-width: 768px)': {
            bottom: '20px',
            right: '20px'
        }
    };

    const iconStyles = {
        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
        '@media (max-width: 768px)': {
            width: '50px',
            height: '50px'
        }
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'scale(1)';
    };

    return (
        <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyles}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                style={iconStyles}
            >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.822 8.594c-.137.604-.45.753-.912.47l-2.52-1.86-1.216 1.17c-.135.135-.248.248-.508.248l.178-2.52 4.594-4.148c.2-.178-.044-.278-.31-.1l-5.683 3.58-2.45-.818c-.533-.178-.544-.532.112-.788l9.58-3.693c.442-.16.83.106.686.786z"
                    fill="currentColor"
                />
            </svg>
        </a>
    );
};

export default TelegramIcon;
