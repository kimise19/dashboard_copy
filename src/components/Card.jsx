import React from 'react';
import { FaUsers } from "react-icons/fa";
import { CiMoneyCheck1 } from "react-icons/ci";
import '../styles/Card.css';

const users = [
    {
        title: "Usuarios",
        number: "113213",
        icon: <FaUsers />,
        description: "Actualizar ahora",
    },
    {
        title: "Dinero",
        number: "54545",
        icon: <CiMoneyCheck1 />,
        description: "Filtrar",
    },{
        title: "Usuarios",
        number: "113213",
        icon: <FaUsers />,
        description: "Actualizar ahora",
    },
    {
        title: "Dinero",
        number: "54545",
        icon: <CiMoneyCheck1 />,
        description: "Filtrar",
    }
];

const Card = () => {
    return (
        <div className='card--container'>
            {users.map((user, index) => (
                <div className='card' key={index}>
                    <div className='card--content'>
                        <div className='card--header'>
                            <div className='card--icon'>{user.icon}</div>
                            <h2>{user.title}</h2>
                        </div>
                        <p className='card--number'>{user.number}</p>
                        <p className='card--description'>{user.description}</p>
                        <hr className='separator' />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
