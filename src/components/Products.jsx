
import '../styles/Products.css'
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import React, { useState } from 'react';
const Products = () => {
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);

    const toggleCategoryForm = () => {
        setShowCategoryForm(!showCategoryForm);
    }
    const toggleProductForm = () => {
        setShowProductForm(!showProductForm);
    };

    return (

        <div>
            <div className="search-bar">
                <div className="search-input">
                    <input type="text" placeholder="Buscar..." />
                    <FaSearch className="search-icon" />
                </div>
                <div className="add-options">
                    <div className="add-option" onClick={toggleProductForm}>
                        <IoMdAddCircle className="add-icon" />
                        <span>Agregar Producto</span>
                    </div>
                    <div className="add-option" onClick={toggleCategoryForm}>
                        <IoMdAddCircle className="add-icon" />
                        <span>Agregar Categoría</span>
                    </div>
                </div>
            </div>
            {showProductForm && (
                <div className="floating-card">
                    <h3>NUEVO PRODUCTO</h3>
                    <input type="text" placeholder="Nombre del producto" />
                    <input type="text" placeholder="Imagen" />
                    <input type="text" placeholder="Categoria" />
                    <input type="text" placeholder="Descripción" />
                    <button onClick={toggleProductForm}>Cancelar</button>
                    <button>Guardar</button>
                </div>
            )}
            {showCategoryForm && (
                <div className="floating-card">
                    <h3>NUEVA CATEGORIA</h3>
                    <input type="text" placeholder="Nombre de la categoría" />
                    <input type="text" placeholder="Descripcion de la Categoria" />
                    <button onClick={toggleCategoryForm}>Cancelar</button>
                    <button>Guardar</button>
                </div>
            )}
            <div className="card-container">
                <div className="card">
                    <h2>LISTADO PRODUCTOS</h2>
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

export default Products