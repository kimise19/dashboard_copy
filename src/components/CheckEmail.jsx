import React, { useState, useEffect } from 'react';
import { FaCircleCheck } from "react-icons/fa6";
import logo from '../images/copy xpress.png';
import '../styles/Verification.css';

const CheckEmail = () => {
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            window.location.href = 'about:blank';
            window.close();
        }, 10000);
        return () => {
            clearTimeout(timeout);
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="verification-container">
            <img src={logo} alt="Logo" className="verification-logo" />
            <div className="verification-card">
                <h1 className="verification-title">Verificación</h1>
                <FaCircleCheck className="verification-icon" />
                <p className="verification-message">
                    ¡Se a enviado un mensaje a tu correo electrónico!
                </p>
                <p className="countdown-message">
                    Esta página se cerrará automáticamente en {countdown} segundos.
                </p>
                <div className="countdown-bar" style={{ width: `${countdown * 20}%` }} />
            </div>
        </div>
    );
};

export default CheckEmail
