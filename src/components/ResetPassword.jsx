import React, { useState } from 'react';
import '../styles/ResetPassword.css';
import logo from '../images/copy xpress.png';
import { useHistory } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const history = useHistory(); 
    const handleSubmit = (e) => {
        e.preventDefault();
         history.push('/new-password');
       
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Logo" className="login-logo" />
            <div className="info-card">
                <p>Porfavor ingresa tu correo electrónico.
                    Recibirá un enlace para crear una nueva contraseña por correo electrónico.</p>
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
                    <button type="submit" className="login-button">Obtener nueva contraseña</button>
                </form>

            </div>
            <a href="/" className="back-to-login-link">Volver al inicio de sesión</a>
        </div>
    );
};

export default ResetPassword;
