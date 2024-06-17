import React, { useEffect, useState } from 'react';
import { FaUsers } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { getAllUsers,getAllProducts } from '../services/productService'
import '../styles/Card.css';

const Card = () => {
    const [, setUsers] = useState([]);
    const [, setProducts] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0); 

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

        const fetchProducts = async () => {
            try {
                const data = await getAllProducts(1, ''); 
                setProducts(data);
                setProductCount(data.pageCount || 0); 
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchUsers();
        fetchProducts();
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
            <div className='card--1'>
                <div className='card--content'>
                    <div className='card--header'>
                        <div className='card--icon'><FaBasketShopping /></div>
                        <h2>Productos</h2>
                    </div>
                    <p className='card--number'>{productCount}</p> 
                    <hr className='separator' />
                    <p className='card--description'>Actualizar ahora</p>
                </div>
            </div>
        </div>
    );
};

export default Card;