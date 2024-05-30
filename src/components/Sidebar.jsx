import React from 'react';
import imagen from '../images/copy xpress.png';
import { FiPrinter } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { FaBasketShopping } from "react-icons/fa6";
import { MdAddShoppingCart } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = ({ onMenuClick }) => {
    return (
        <div className="menu">
            <div className="logo">
                <img src={imagen} alt="logo-icon" />
                CopyExpress
            </div>
            <hr className="divider" />
            <div className="menu--list">
                <a href="#" className="item" onClick={() => onMenuClick('dashboard', 'Dashboard')}>
                    <IoMdHome className="logo-icon" />
                    Dashboard
                </a>
                <a href="#" className="item" onClick={() => onMenuClick('stationery', 'Papeleria')}>
                    <FiPrinter className="logo-icon" />
                    Papeleria
                </a>
                <a href="#" className="item" onClick={() => onMenuClick('productos', 'Productos')}>
                    <FaBasketShopping className="logo-icon" />
                    Productos
                </a>
                <a href="#" className="item" onClick={() => onMenuClick('orders', 'Pedidos')}>
                    <MdAddShoppingCart className="logo-icon" />
                    Pedidos
                </a>
                <a href="#" className="item" onClick={() => onMenuClick('users', 'Usuarios')}>
                    <FaUserEdit className="logo-icon" />
                    Usuarios
                </a>
            </div>
        </div>
    );
};

export default Sidebar;