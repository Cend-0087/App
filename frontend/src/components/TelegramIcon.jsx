import React, { useState } from 'react';

const TelegramIcon = () => {
    const [isHovered, setIsHovered] = useState(false);
    const telegramUrl = "https://t.me/KybrakMotors_bot";

    return (
        <>
            <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="telegram-link"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    className={`telegram-icon ${isHovered ? 'hovered' : ''}`}
                >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.822 8.594c-.137.604-.45.753-.912.47l-2.52-1.86-1.216 1.17c-.135.135-.248.248-.508.248l.178-2.52 4.594-4.148c.2-.178-.044-.278-.31-.1l-5.683 3.58-2.45-.818c-.533-.178-.544-.532.112-.788l9.58-3.693c.442-.16.83.106.686.786z"
                        fill="currentColor"
                    />
                </svg>
            </a>

            <style>{`
                .telegram-link {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    z-index: 1000;
                    color: #0088cc;
                    text-decoration: none;
                    display: block;
                    transition: transform 0.3s ease;
                    cursor: pointer;
                }

                .telegram-icon {
                    width: 60px;
                    height: 60px;
                    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
                    transition: all 0.3s ease;
                }

                .telegram-icon.hovered {
                    transform: scale(1.1);
                    filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.15));
                }

                /* Планшеты */
                @media (max-width: 992px) {
                    .telegram-link {
                        bottom: 25px;
                        right: 25px;
                    }

                    .telegram-icon {
                        width: 55px;
                        height: 55px;
                    }
                }

                /* Мобильные */
                @media (max-width: 768px) {
                    .telegram-link {
                        bottom: 20px;
                        right: 20px;
                    }

                    .telegram-icon {
                        width: 50px;
                        height: 50px;
                    }
                }

                /* Маленькие телефоны */
                @media (max-width: 480px) {
                    .telegram-link {
                        bottom: 15px;
                        right: 15px;
                    }

                    .telegram-icon {
                        width: 45px;
                        height: 45px;
                    }
                }

                /* Очень маленькие телефоны */
                @media (max-width: 360px) {
                    .telegram-link {
                        bottom: 12px;
                        right: 12px;
                    }

                    .telegram-icon {
                        width: 40px;
                        height: 40px;
                    }
                }

                /* Для устройств с сенсорным экраном убираем hover */
                @media (hover: none) and (pointer: coarse) {
                    .telegram-icon.hovered {
                        transform: none;
                    }
                    
                    .telegram-link:active {
                        transform: scale(0.95);
                    }
                }
            `}</style>
        </>
    );
};

export default TelegramIcon;