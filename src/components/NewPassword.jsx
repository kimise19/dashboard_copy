import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { changePassword } from '../services/productService';
import logo from '../images/copy xpress.png';
import '../styles/NewPassword.css';

const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { token } = useParams(); 
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true); // Activar estado de carga

        try {
            await changePassword(token, password);
            setMessage('Contraseña cambiada con éxito.');
            setShowModal(true);
        } catch (error) {
            setError(error.response?.data?.message || 'Hubo un error al cambiar la contraseña. Por favor, inténtelo de nuevo.');
        } finally {
            setLoading(false); // Desactivar estado de carga, independientemente del resultado
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
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirmar Contraseña</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
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
