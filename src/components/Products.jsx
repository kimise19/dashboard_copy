import '../styles/Products.css';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import React, { useState, useEffect } from 'react';
import { addNewProduct, deleteExistingProduct, addNewCategory, getAllProducts, getAllCategories, productUpdate } from '../services/productService';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { showDeleteConfirmation, showSuccessAlert, showErrorAlert, showEditConfirmation } from './Alert';



const Products = () => {
    const [selectedProductForCard, setSelectedProductForCard] = useState(null);
    const [isCardVisible, setIsCardVisible] = useState(false);


    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newProduct, setNewProduct] = useState({
        categoryId: '',
        picture: null,
        name: '',
        description: '',
        price: '',
        stock: ''
    });
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
    });
    const [productSuccessMessage, setProductSuccessMessage] = useState('');
    const [categorySuccessMessage, setCategorySuccessMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts(page, searchTerm);
                setProducts(response.data);
                setPageCount(response.pageCount);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [page, searchTerm]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const toggleCategoryForm = () => setShowCategoryForm(!showCategoryForm);
    const toggleProductForm = () => setShowProductForm(!showProductForm);

    const goToPreviousPage = () => setPage(prevPage => Math.max(prevPage - 1, 1));
    const goToNextPage = () => setPage(prevPage => Math.min(prevPage + 1, pageCount));

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        setPage(1);
    };
    const IMAGE_BASE_URL = 'https://api-copyxpress.com.kaizensoftwaresa.com/';

    const handleRowClick = (event, product) => {
        if (event.target.tagName === 'TD' && event.target.cellIndex === 0) {
            const productWithImageUrl = {
                ...product,
                picture: IMAGE_BASE_URL + product.picture
            };
            setSelectedProductForCard(productWithImageUrl);
            setIsCardVisible(true);
        }
    };
    
    

    const handleNewProductChange = event => {

        const { name, value, files } = event.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: name === 'picture' ? files[0] : value
        }));
    };

    const createProduct = async () => {
        try {
            const formData = new FormData();
            Object.keys(newProduct).forEach(key => {
                formData.append(key, newProduct[key]);
            });

            const response = await addNewProduct(formData);
            console.log("Product created successfully:", response.data);
            setProductSuccessMessage("¡Producto creado exitosamente!");
            setNewProduct({
                categoryId: '',
                picture: null,
                name: '',
                description: '',
                price: '',
                stock: ''
            });
            setSelectedCategory('');
            document.getElementById('picture').value = '';
            setTimeout(() => setProductSuccessMessage(''), 5000);
        } catch (error) {
            console.error('Error creating product:', error.response ? error.response.data : error.message);
        }
    };

    const deleteProduct = async id => {
        showDeleteConfirmation(async () => {
            try {
                await deleteExistingProduct(id);
                setProducts(products.filter(product => product.id !== id));
                showSuccessAlert('El producto ha sido eliminado.');
            } catch (error) {
                console.error('Error al eliminar el producto:', error.response ? error.response.data : error.message);
                showErrorAlert('Hubo un problema al eliminar el producto.');
            }
        });
    };
    const handleCategoryChange = event => {
        const categoryId = event.target.value;
        console.log("Categoría seleccionada ID:", categoryId);
        setSelectedCategory(categoryId);
        setNewProduct(prevState => ({
            ...prevState,
            categoryId: categoryId
        }));
    };

    const handleNewCategoryChange = event => {
        const { name, value } = event.target;
        setNewCategory(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const createCategory = async () => {
        try {
            const response = await addNewCategory(newCategory);
            console.log("Category created successfully:", response.data);
            setCategorySuccessMessage("¡Categoría creada exitosamente!");
            setNewCategory({
                name: '',
                description: '',
            });
            const categoriesResponse = await getAllCategories();
            setCategories(categoriesResponse);
            setTimeout(() => setCategorySuccessMessage(''), 5000);
        } catch (error) {
            console.error('Error creating category:', error.response ? error.response.data : error.message);
        }
    };
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState({
        categoryId: '',
        picture: null,
        name: '',
        description: '',
        price: '',
        stock: ''
    });
    const openEditModal = product => {
        setSelectedProduct(product);
        setUpdatedProduct({
            categoryId: product.categoryId,
            picture: product.picture,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock
        });
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedProduct(null);
    };

    const handleEditChange = event => {
        const { name, value } = event.target;
        setUpdatedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const updateProduct = async () => {
        try {
            const { id } = selectedProduct;

            const formData = new FormData();
            formData.append('categoryId', updatedProduct.categoryId);
            formData.append('picture', updatedProduct.picture);
            formData.append('name', updatedProduct.name);
            formData.append('description', updatedProduct.description);
            formData.append('price', updatedProduct.price);
            formData.append('stock', updatedProduct.stock);

            showEditConfirmation(async () => {
                const response = await productUpdate(id, formData);
                console.log("Product updated successfully:", response.data);
                const updatedResponse = await getAllProducts(page, searchTerm);
                setProducts(updatedResponse.data);
                closeEditModal();
                showSuccessAlert('Producto actualizado exitosamente.');
            });
        } catch (error) {
            console.error('Error updating product:', error.response ? error.response.data : error.message);
        }
    };

    const handleEditImageChange = event => {
        const file = event.target.files[0];
        setUpdatedProduct(prevState => ({
            ...prevState,
            picture: file
        }));
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
            {editModalOpen && selectedProduct && (
                <div className="modal-background">
                    <form onSubmit={e => {
                        e.preventDefault();
                        updateProduct();
                    }}>
                        <div className="floating-card">
                            <h3>EDITAR PRODUCTO</h3>
                            <div className="form-group">
                                <label htmlFor="editName">Nombre del producto</label>
                                <input type="text" id="editName" name="name" value={updatedProduct.name} onChange={handleEditChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="editDescription">Descripción</label>
                                <input type="text" id="editDescription" name="description" value={updatedProduct.description} onChange={handleEditChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="editCategory">Categoría</label>
                                <select id="editCategory" name="categoryId" value={updatedProduct.categoryId} onChange={handleEditChange} required>
                                    <option value="">Seleccionar Categoría</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div className="form-group">
                                <label htmlFor="editImage">Imagen</label>
                                <input type="file" id="editImage" name="picture" onChange={handleEditImageChange} accept="image/*" />
                            </div>
                            <div className="form-group price-stock-group">
                                <div className="form-group-half">
                                    <label htmlFor="editPrice">Precio</label>
                                    <input type="number" id="editPrice" name="price" value={updatedProduct.price} onChange={handleEditChange} required />
                                </div>
                                <div className="form-group-half">
                                    <label htmlFor="editStock">stock</label>
                                    <input type="number" id="editStock" name="stock" value={updatedProduct.stock} onChange={handleEditChange} required />
                                </div>
                            </div>
                            <div className="button-group">
                                <button type="submit" className='button_primary'>Guardar</button>
                                <button type="button" className='button_danger' onClick={closeEditModal}>Cancelar</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {showProductForm && (
                <div className="modal-background">
                    <form onSubmit={e => {
                        e.preventDefault();
                        createProduct();
                    }}>
                        <div className="floating-card">
                            <h3>NUEVO PRODUCTO</h3>
                            <div className="form-group">
                                <label htmlFor="category">Categoría</label>
                                <select id="category" value={selectedCategory} onChange={handleCategoryChange} required>
                                    <option value="">Seleccionar Categoría</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Imagen</label>
                                <input type="file" id="picture" name="picture" onChange={handleNewProductChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Nombre del producto</label>
                                <input type="text" id="name" placeholder="Nombre del producto" name="name" value={newProduct.name} onChange={handleNewProductChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción</label>
                                <input type="text" id="description" placeholder="Descripción" name="description" value={newProduct.description} onChange={handleNewProductChange} required />
                            </div>
                            <div className="form-group price-stock-group">
                                <div className="form-group-half">
                                    <label htmlFor="price">Precio</label>
                                    <input type="number" id="price" placeholder="Precio" name="price" value={newProduct.price} onChange={handleNewProductChange} required />
                                </div>
                                <div className="form-group-half">
                                    <label htmlFor="stock">Stock</label>
                                    <input type="number" min="1" id="stock" placeholder="stock" name="stock" value={newProduct.stock} onChange={handleNewProductChange} required />
                                </div>
                            </div>
                            <div className="button-group">
                                <button type="submit" className='button_primary'>Guardar</button>
                                <button type="button" className='button_danger' onClick={toggleProductForm}>Cancelar</button>
                            </div>
                            {productSuccessMessage && (
                                <div className="success-message">{productSuccessMessage}</div>
                            )}
                        </div>
                    </form>
                </div>
            )}

            {showCategoryForm && (
                <div className='modal-background'>
                    <form onSubmit={e => {
                        e.preventDefault();
                        createCategory();
                    }}>
                        <div className="floating-card">
                            <h3>NUEVA CATEGORÍA</h3>
                            <div className="form-group">
                                <label htmlFor="categoryName">Nombre de la categoría</label>
                                <input type="text" id="categoryName" name="name" placeholder="Nombre de la categoría" value={newCategory.name} onChange={handleNewCategoryChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="categoryDescription">Descripción de la categoría</label>
                                <input type="text" id="categoryDescription" name="description" placeholder="Descripción de la categoría" value={newCategory.description} onChange={handleNewCategoryChange} required />
                            </div>
                            <div className="button-group">
                                <button className='button_primary' type="submit">Guardar</button>
                                <button type="button" className='button_danger' onClick={toggleCategoryForm}>Cancelar</button>
                            </div>
                            {categorySuccessMessage && (
                                <div className="success-message">{categorySuccessMessage}</div>
                            )}
                        </div>
                    </form>
                </div>
            )}
            {isCardVisible && (
                <div className="floating-card">
                    <div className="card-content">
                        <h2>{selectedProductForCard.name}</h2>
                        <img  src={selectedProductForCard.picture} alt={selectedProductForCard.name} width="175" />
                        <p><strong>Categoría:</strong> {selectedProductForCard.categoryName}</p>
                        <p><strong>Descripción:</strong> {selectedProductForCard.description}</p>
                        <p><strong>Precio:</strong> ${selectedProductForCard.price}</p>
                        <p><strong>Stock:</strong> {selectedProductForCard.stock}</p>
                        <button  className='button_danger' onClick={() => setIsCardVisible(false)}>Cerrar</button>
                    </div>
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
                                    <tr key={product.id} onClick={(e) => handleRowClick(e, product)}>
                                        <td className="product-name">{product.name}</td>
                                        <td>
                                            <img src={`https://api-copyxpress.com.kaizensoftwaresa.com/${product.picture}`} alt={product.name} width="50" />
                                        </td>
                                        <td>{product.categoryName}</td>
                                        <td>{product.description}</td>
                                        <td>${product.price.toFixed(2)}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <span onClick={() => openEditModal(product)}>
                                                <i className="fas fa-print"></i> <HiOutlinePencilSquare className="icon-pencil" />
                                            </span>
                                            <span onClick={() => deleteProduct(product.id)}>
                                                <i className="fas fa-trash"></i> <IoMdClose className="icon-pencil-1" />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination-container">
                        <button className="pagination-button" onClick={goToPreviousPage} disabled={page === 1}>
                            <FiArrowLeft />
                        </button>
                        <button className="pagination-button" onClick={goToNextPage} disabled={page === pageCount}>
                            <FiArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Products;