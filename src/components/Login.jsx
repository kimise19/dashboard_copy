import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import logo from '../images/copy xpress.png';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import '../styles/Login.css';
import { login } from '../services/productService';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
            const token = await login(username, password); 
            const decodedToken = jwtDecode(token);
            console.log('Token decodificado:', decodedToken);
            
            if (decodedToken.roles[0] === 'Admin') {
                onLogin();
                history.push('/dashboard');
            } else {
                setError('No tienes permiso para acceder a esta sección.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
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
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle-button"
                            >
                                {showPassword ? <IoIosEye />: <IoIosEyeOff/> }
                            </button>
                        </div>
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
