import {jwtDecode} from 'jwt-decode';

export const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return true; 
    }
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const validateToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        return decodedToken.exp > currentTime;
    } catch (error) {
        console.error('Token no válido:', error);
        return false;
    }
};