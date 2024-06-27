import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { verifyEmail } from '../services/productService';
import { FaCircleCheck } from "react-icons/fa6";
import logo from '../images/copy xpress.png';
import '../styles/Verification.css';


const Verification = () => {
    const [countdown, setCountdown] = useState(5);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        const verifyEmailToken = async () => {
            try {
                await verifyEmail(token);
                setMessage('¡Se ha verificado tu correo electrónico correctamente!');
            } catch (error) {
                setError('Hubo un problema al verificar tu correo electrónico. Por favor, inténtalo de nuevo.');
            }
        };

        verifyEmailToken();

        const timer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            window.location.href = 'about:blank';
            window.close();
        }, 5000);

        return () => {
            clearTimeout(timeout);
            clearInterval(timer);
        };
    }, [token]);

    return (
        <div className="verification-container">
            <img src={logo} alt="Logo" className="verification-logo" />
            <div className="verification-card">
                <h1 className="verification-title">Verificación</h1>
                <FaCircleCheck className="verification-icon" />
                <p className="verification-message">
                    {message || error}
                </p>
                <p className="countdown-message">
                    Esta página se cerrará automáticamente en {countdown} segundos.
                </p>
                <div className="countdown-bar" style={{ width: `${countdown * 20}%` }} />
            </div>
        </div>
    );
};

export default Verification;
