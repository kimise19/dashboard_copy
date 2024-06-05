import React from 'react';
import { FaUsers } from "react-icons/fa";
import { CiMoneyCheck1 } from "react-icons/ci";
import '../styles/Card.css';

const users = [
    {
        title: "Usuarios",
        number: "3",
        icon: <FaUsers />,
        description: "Actualizar ahora",
    },
    {
        title: "Pedidos",
        number: "3",
        icon: <CiMoneyCheck1 />,
        description: "Actualizar ahora",
    },
    {
        title: "Productos",
        number: "20",
        icon: <CiMoneyCheck1 />,
        description: "Actualizar ahora",
    },
    {
        title: "Usuarios",
        number: "3",
        icon: <CiMoneyCheck1 />,
        description: "Filtrar",
    }
];

const Card = () => {
    return (
        <div className='card--container--1'>
            {users.map((user, index) => (
                <div className='card--1' key={index}>
                    <div className='card--content'>
                        <div className='card--header'>
                            <div className='card--icon'>{user.icon}</div>
                            <h2>{user.title}</h2>
                        </div>
                        <p className='card--number'>{user.number}</p>
                        <hr className='separator' />
                        <p className='card--description'>{user.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;