import React from 'react';
import '../styles/content.css';
import { IoPrintOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import '../styles/Papeleria.css'
const Papeleria = () => {
    return (
        <div>
            <div className="card-container">
                <div className="card">
                    <h2>TABLA DE IMPRESIONES</h2>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Documento</th>
                                    <th>Tipo de Papel</th>
                                    <th>Color/Blanco Negro</th>
                                    <th>Formato Hoja</th>
                                    <th>Anillado</th>
                                    <th>Material Anillado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                    <td>
                                        <span>
                                            <i className="fas fa-print"></i> {<IoPrintOutline />}
                                        </span>
                                        <span>
                                            <i className="fas fa-trash"></i> {<FaRegTrashCan />}
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

export default Papeleria;
