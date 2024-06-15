import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import logo from '../images/copy xpress.png';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!username || !password) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://api-copyxpress.com.kaizensoftwaresa.com/api/Account/login', {
                email: username,
                password: password
            });

            if (response.status === 200) {
                const token = response.data.token;
                const decodedToken = jwtDecode(token);
                console.log('toke decodificado', decodedToken);
                if (decodedToken.roles[0] === 'Admin') {
                    localStorage.setItem('token', token);

                    history.push('/dashboard');
                    onLogin();
                } else {
                    setError('No tienes permiso para acceder a esta sección.');
                }
            } else {
                console.error('Inicio de sesión fallido:', response.data);
                setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Credenciales incorrectas.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Logo" className="login-logo" />
            <div className="login-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Correo Electrónico:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
            <a href="/reset-password" className="forgot-password-link">¿Olvidaste tu contraseña?</a>
        </div>
    );
};

export default Login;
