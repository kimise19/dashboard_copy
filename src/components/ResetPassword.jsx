import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { resetPassword } from '../services/productService';
import logo from '../images/copy xpress.png';
import '../styles/ResetPassword.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const routerHistory = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await resetPassword(email);
            
            routerHistory.push('/check-email'); 
        } catch (error) {
            setError(error.response?.data?.message || 'Hubo un error al enviar el correo electrónico. Por favor, inténtelo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Logo" className="login-logo" />
            <div className="info-card">
                <p>Por favor, ingresa tu correo electrónico. Recibirás un enlace para crear una nueva contraseña por correo electrónico.</p>
            </div>
            <div className="login-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Cargando...' : 'Obtener nueva contraseña'}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
            <a href="/" className="back-to-login-link">Volver al inicio de sesión</a>
        </div>
    );
};

export default ResetPassword;
