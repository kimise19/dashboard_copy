import React from 'react';
import '../styles/Pedidos.css'
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


const Pedidos = () => {
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
                                    <th>Nombre</th>
                                    <th>Imagen</th>
                                    <th>Categoría</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cuaderno Ideal 100</td>
                                    <td>Image</td>
                                    <td>Cuadernos</td>
                                    <td>ejecutivo</td>
                                    <td>$3,20</td>
                                    <td>Dato 3</td>
                                    <td>
                                        <span>
                                            <i className="fas fa-print"></i> {<HiOutlinePencilSquare />}
                                        </span>
                                        <span>
                                            <i className="fas fa-trash"></i> {<IoMdClose />}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pedidos