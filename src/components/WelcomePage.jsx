import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { verifyEmail } from '../services/productService';
import { FaCircleCheck } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import logo from '../images/copy xpress.png';
import '../styles/Verification.css';

const Verification = () => {
    const [countdown, setCountdown] = useState(10);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isError400, setIsError400] = useState(false);

    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        const verifyEmailToken = async () => {
            try {
                // const response =await verifyEmail(token);
                await verifyEmail(token);
                setMessage('¡Se ha verificado tu correo electrónico correctamente!');
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setIsError400(true);
                    setError(error.response.data.message || 'Hubo un problema al verificar tu correo electrónico. Por favor, inténtalo de nuevo.');
                } else {
                    setError('Hubo un problema al verificar tu correo electrónico. Por favor, inténtalo de nuevo.');
                }
            }
        };

        verifyEmailToken();

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
    }, [token]);

    return (
        <div className="verification-container">
            <img src={logo} alt="Logo" className="verification-logo" />
            <div className="verification-card">
                <h1 className="verification-title">Verificación</h1>
                {isError400 ? <TiDelete className="verification-icon error" /> : <FaCircleCheck className="verification-icon" />}
                <p className="verification-message">
                    {message || error}
                </p>
                <p className="countdown-message">
                    Esta página se cerrará automáticamente en {countdown} segundos.
                </p>
                <div className="countdown-bar" style={{ width: `${countdown * 10}%` }} />
            </div>
        </div>
    );
};

export default Verification;
