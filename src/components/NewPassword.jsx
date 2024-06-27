import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { changePassword } from '../services/productService';
import logo from '../images/copy xpress.png';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import '../styles/NewPassword.css';

const NewPassword = () => {
    const routerHistory = useHistory();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true); 

        try {
            await changePassword(token, password);
            routerHistory.push('/password-changed');
            setShowModal(true);
        } catch (error) {
            setError(error.response?.data?.message || 'Hubo un error al cambiar la contraseña. Por favor, inténtelo de nuevo.');
        } finally {
            setLoading(false); 
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Logo" className="login-logo" />
            <div className="info-card-1">
                <p>Ingrese su nueva contraseña a continuación.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="login-card">
                    <div className="form-group">
                        <label>Nueva Contraseña</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle-button"
                            >
                                {showPassword ? <IoIosEye /> : <IoIosEyeOff/>}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Confirmar Contraseña</label>
                        <div className="password-input-container">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="password-toggle-button"
                            >
                                {showConfirmPassword ?<IoIosEye /> : <IoIosEyeOff /> }
                            </button>
                        </div>
                    </div>
                    <p><i> Nota: </i> La contraseña debe tener al menos ocho caracteres. Utilice letras mayúsculas y minúsculas, números y símbolos.</p>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Guardando...' : 'Guardar Contraseña'}
                    </button>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                </div>
            </form>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <p>{message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewPassword;
