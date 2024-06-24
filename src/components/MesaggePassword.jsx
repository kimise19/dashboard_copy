import React from 'react';

const CheckEmail = () => {
    return (
        <div className="check-email-container">
            <h1>Revisa tu correo electrónico para continuar</h1>
            <p>Hemos enviado un enlace de restablecimiento de contraseña a tu correo electrónico. Por favor, revisa tu bandeja de entrada y sigue las instrucciones.</p>
            <a href="/" className="back-to-login-link">Volver al inicio de sesión</a>
        </div>
    );
};

export default CheckEmail;
