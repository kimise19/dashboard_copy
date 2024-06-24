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

    

    return (
        <div className="login-container">
            <img src={logo} alt="Logo" className="login-logo" />

            <form onSubmit={handleSubmit}>
                <div className="login-card">
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
                    <p><i> Nota: </i>  La contraseña debe tener al menos ocho caracteres.  Para hacerlo más fuerte, utilice letras mayúsculas y minúsculas, números y símbolos.</p>
                    <button type="submit" className="login-button">Guardar Contraseña</button>
                </div>
            </form>
        </div>
    );
};

export default NewPassword;
