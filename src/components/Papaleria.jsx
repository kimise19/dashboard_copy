import React, { useEffect,useState } from 'react';
import '../styles/content.css';
import { IoPrintOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import '../styles/Papeleria.css'
import { getAllPrints } from '../services/productService';

const Papeleria = () => {
    const [prints, setPrints] = useState([]);
    useEffect(() => {
        const fetchPrints = async () => {
            try {
                const response = await getAllPrints();
                setPrints(response);
            } catch (error) {
                console.error('Error fetching prints:', error);
            }
        };
        fetchPrints();
    }, []);

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
                                {prints.map(print=>(
                                <tr key={print.id}>
                                    <td>{print.document}</td>
                                    <td>{print.paperType}</td>
                                    <td>{print.color}</td>
                                    <td>{print.sheetFormat}</td>
                                    <td>{print.banding}</td>
                                    <td>{print.bandingMaterial}</td>
                                    <td>
                                        <span>
                                            <i className="fas fa-print"></i> {<IoPrintOutline />}
                                        </span>
                                        <span>
                                            <i className="fas fa-trash"></i> {<FaRegTrashCan />}
                                        </span>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Papeleria;
