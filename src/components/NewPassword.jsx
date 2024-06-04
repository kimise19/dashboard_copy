import React, { useState } from 'react';
import logo from '../images/copy xpress.png';
import { useHistory } from 'react-router-dom';
import '../styles/NewPassword.css';



const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    const handleBackToLogin = () => {
        history.push('/');
    };

    return (
        <div className="reset-container">
            <img src={logo} alt="Logo" className="reset-logo" />
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nueva Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirmar Contraseña:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="reset-button">Guardar Contraseña</button>
            </form>
            <p className="back-to-login" onClick={handleBackToLogin}>Volver al inicio de sesión</p>
        </div>
    );
};

export default NewPassword;
