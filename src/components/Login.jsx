import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 
import logo from '../images/copy xpress.png';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://api-shop.somee.com/api/Account/login', {
                email: username,
                password: password
            });

            if (response.status === 200) {
                history.push('/dashboard'); 
                onLogin();
            } else {
                console.error('Inicio de sesión fallido:', response.data);
                setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
            }

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Logo" className="login-logo" />
            <div className="login-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-button">Iniciar Sesión</button>
                    {error && <p className="error-message">{error}</p>} 
                </form>
            </div>
            <a href="/reset-password" className="forgot-password-link">¿Olvidaste tu contraseña?</a>
        </div>
    );
};

export default Login;
