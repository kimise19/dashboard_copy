import React, { useState, useEffect } from 'react';
import '../styles/Pedidos.css';
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { getAllOrders } from '../services/productService';



const Pedidos = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getAllOrders();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
    };

    const closeCard = () => {
        setSelectedOrder(null);
    };

    return (
        <div>
            <div className="search-bar">
                <div className="search-input">
                    <input type="text" placeholder="Buscar..." />
                    <FaSearch className="search-icon" />
                </div>
            </div>
            <div className="card-container">
                <div className="card">
                    <h2>LISTADO DE PEDIDOS</h2>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Total</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.ShippingAddress.firstName || 'N/A'}</td>
                                        <td>${order.total}</td>
                                        <td>
                                            <button onClick={() => handleViewOrder(order)}>
                                                Ver pedido
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {selectedOrder && (
                <div className="floating-card">
                    <div className="card-content">
                        <button className="close-button" onClick={closeCard}><IoMdClose /></button>
                        <h3>Detalles del Pedido #{selectedOrder.id}</h3>
                        <p><strong>Email del comprador:</strong> {selectedOrder.buyerEmail}</p>
                        <p><strong>Fecha del pedido:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                        <p><strong>Precio de envío:</strong> ${selectedOrder.shippingPrice}</p>
                        <p><strong>Subtotal:</strong> ${selectedOrder.subtotal}</p>
                        <p><strong>Total:</strong> ${selectedOrder.total}</p>
                        <p><strong>Estado del pedido:</strong> {selectedOrder.orderStatus}</p>
                        <p><strong>Método de entrega:</strong> {selectedOrder.deliveryMethod.shortName} - {selectedOrder.deliveryMethod.deliveryTime}</p>
                        <p><strong>Dirección de envío:</strong> {selectedOrder.ShippingAddress.street}, {selectedOrder.ShippingAddress.city}, {selectedOrder.ShippingAddress.province}</p>
                        <h4>Items del Pedido:</h4>
                        <ul>
                            {selectedOrder.orderItems.map(item => (
                                <li key={item.id}>
                                    {item.productItem.nameItem} - ${item.productItem.priceItem} x {item.productItem.quantityItem}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pedidos;