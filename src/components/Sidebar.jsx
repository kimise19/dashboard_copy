import React, { useState } from 'react';
import imagen from '../images/copy xpress.png';
import { FiPrinter } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { FaBasketShopping } from "react-icons/fa6";
import { MdAddShoppingCart } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import "../styles/Sidebar.css";
import { BiLogOut } from "react-icons/bi";
import { showExitSession } from './Alert';

const Sidebar = ({ onMenuClick, onLogout }) => {
    const [activeItem, setActiveItem] = useState('dashboard');

    const handleMenuClick = (item, label) => {
        setActiveItem(item);
        onMenuClick(item, label);
    };

    const handleLogout = () => {
        showExitSession(() => {
            onLogout(); 
        });
    };

    return (
        <div className="menu">
            <div className="logo">
                <img src={imagen} alt="logo-icon" />
                CopyXpress
            </div>
            <hr className="divider" />
            <div className="menu--list">
                <a
                    href="#"
                    className={`item ${activeItem === 'dashboard' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('dashboard', 'Dashboard')}
                >
                    <IoMdHome className="logo-icon" />
                    Dashboard
                </a>
                <a
                    href="#"
                    className={`item ${activeItem === 'stationery' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('stationery', 'Papeleria')}
                >
                    <FiPrinter className="logo-icon" />
                    Papeleria
                </a>
                <a
                    href="#"
                    className={`item ${activeItem === 'productos' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('productos', 'Productos')}
                >
                    <FaBasketShopping className="logo-icon" />
                    Productos
                </a>
                <a
                    href="#"
                    className={`item ${activeItem === 'orders' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('orders', 'Pedidos')}
                >
                    <MdAddShoppingCart className="logo-icon" />
                    Pedidos
                </a>
                <a
                    href="#"
                    className={`item ${activeItem === 'users' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('users', 'Usuarios')}
                >
                    <FaUserEdit className="logo-icon" />
                    Usuarios
                </a>
                <a
                    href="#"
                    className={`item ${activeItem === 'logout' ? 'active' : ''}`}
                    onClick={handleLogout}
                >
                    <BiLogOut className="logo-icon-out" />
                    Cerrar sesión
                </a>
            </div>
        </div>
    );
};

export default Sidebar;