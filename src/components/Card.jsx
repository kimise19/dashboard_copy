import React, { useEffect, useState } from 'react';
import { FaUsers } from "react-icons/fa";
import { CiMoneyCheck1 } from "react-icons/ci";
import { getAllUsers } from '../services/productService'
import '../styles/Card.css';

const Card = () => {
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
                setUserCount(data.length); 
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className='card--container--1'>
            <div className='card--1'>
                <div className='card--content'>
                    <div className='card--header'>
                        <div className='card--icon'><FaUsers /></div>
                        <h2>Usuarios</h2>
                    </div>
                    <p className='card--number'>{userCount}</p>
                    <hr className='separator' />
                    <p className='card--description'>Actualizar ahora</p>
                </div>
            </div>
        </div>
    );
};

export default Card;