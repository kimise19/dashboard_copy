import '../styles/Products.css';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
const Products = () => {
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [newProduct, setNewProduct] = useState({
        CategoryID: '',
        Image: null,
        Name: '',
        Description: '',
        Price: ''
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://api-shop.somee.com/api/Product/get-all-products?pageNumber=${page}&search=${searchTerm}`);
                setProducts(response.data.data);
                setPageCount(response.data.pageCount);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [page, searchTerm]);

    const toggleCategoryForm = () => {
        setShowCategoryForm(!showCategoryForm);
    }

    const toggleProductForm = () => {
        setShowProductForm(!showProductForm);
    };
    const goToPreviousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };
    const goToNextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, pageCount));
    };
    const handleSearch = event => {
        setSearchTerm(event.target.value);
        setPage(1); 
    };
    const handleNewProductChange = (event) => {
        const { name, value } = event.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: name === 'Image' ? event.target.files[0] : value
        }));
    };
    const createProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('CategoryID', newProduct.CategoryID);
            formData.append('Image', newProduct.Image);
            formData.append('Name', newProduct.Name);
            formData.append('Description', newProduct.Description);
            formData.append('Price', newProduct.Price);

            const response = await axios.post('http://api-shop.somee.com/api/Product/add-new-product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("Product created successfully:", response.data);

        } catch (error) {
            console.error('Error creating product:', error.response ? error.response.data : error.message);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://api-shop.somee.com/api/Product/delete-existing-product/${id}`);
            setProducts(products.filter(product => product.id !== id));
            console.log("Product deleted successfully");
        } catch (error) {
            console.error('Error deleting product:', error.response ? error.response.data : error.message);
        }
    };
    return (
        <div>
            <div className="search-bar">
                <div className="search-input">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
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
                    <input type="number" placeholder="Categoria" name="CategoryID" value={newProduct.CategoryID} onChange={handleNewProductChange} />
                    <input type="file" placeholder="Imagen" name="Image" onChange={handleNewProductChange} />
                    <input type="text" placeholder="Nombre del producto" name="Name" value={newProduct.Name} onChange={handleNewProductChange} />
                    <input type="text" placeholder="Descripción" name="Description" value={newProduct.Description} onChange={handleNewProductChange} />
                    <input type="number" placeholder="Precio" name="Price" value={newProduct.Price} onChange={handleNewProductChange} />
                    <button onClick={toggleProductForm}>Cancelar</button>
                    <button onClick={createProduct}>Guardar</button>
                </div>
            )}
            {showCategoryForm && (
                <div className="floating-card">
                    <h3>NUEVA CATEGORIA</h3>
                    <input type="text" placeholder="Nombre de la categoría" />
                    <input type="text" placeholder="Descripción de la categoría" />
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
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>
                                            <img src={product.picture} alt={product.name} width="50" />
                                        </td>
                                        <td>{product.categoryName}</td>
                                        <td>{product.description}</td>
                                        <td>${product.price.toFixed(2)}</td>
                                        <td>Dato 3</td>
                                        <td>
                                            <span>
                                                <i className="fas fa-print"></i> <HiOutlinePencilSquare />
                                            </span>
                                            <span onClick={() => deleteProduct(product.id)}>
                                                <i className="fas fa-trash"></i> <IoMdClose />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={goToPreviousPage} disabled={page === 1}>Página Anterior</button>
                    <button onClick={goToNextPage} disabled={page === pageCount}>Siguiente Página</button>
                </div>
            </div>
        </div>
    );
}
export default Products;
