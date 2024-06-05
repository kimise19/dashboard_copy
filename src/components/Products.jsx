import '../styles/Products.css';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import React, { useState, useEffect } from 'react';
import { addNewProduct, deleteExistingProduct, addNewCategory, getAllProducts, getAllCategories,productUpdate} from '../services/productService';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { showDeleteConfirmation,showSuccessAlert,showErrorAlert,showEditConfirmation } from './Alert';
const Products = () => {
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newProduct, setNewProduct] = useState({
        CategoryID: '',
        Image: null,
        Name: '',
        Description: '',
        Price: '',
        Stock: ''
    });
    const [newCategory, setNewCategory] = useState({
        Name: '',
        Description: '',
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

    const handleNewProductChange = event => {
        const { name, value, files } = event.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: name === 'Image' ? files[0] : value
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
                CategoryID: '',
                Image: null,
                Name: '',
                Description: '',
                Price: '',
                Stock: ''
            });
            setSelectedCategory('');
            document.getElementById('image').value = '';
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
        setSelectedCategory(categoryId);
        setNewProduct(prevState => ({
            ...prevState,
            CategoryID: categoryId
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
                Name: '',
                Description: '',
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
        CategoryID: '',
        Image: null,
        Name: '',
        Description: '',
        Price: '',
        Stock: ''
    });
    const openEditModal = product => {
        setSelectedProduct(product);
        setUpdatedProduct({
            CategoryID: product.categoryID,
            Image: product.image,
            Name: product.name,
            Description: product.description,
            Price: product.price,
            Stock: product.stock
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
            formData.append('CategoryID', updatedProduct.CategoryID);
            formData.append('Image', updatedProduct.Image);
            formData.append('Name', updatedProduct.Name);
            formData.append('Description', updatedProduct.Description);
            formData.append('Price', updatedProduct.Price);
            formData.append('Stock', updatedProduct.Stock);
    
            showEditConfirmation(async () => {
                const response = await productUpdate(id, formData);
                console.log("Product updated successfully:", response.data);
                // Llamar a la API para mostrar todos los productos después de la actualización
                const updatedResponse = await getAllProducts(page, searchTerm);
                setProducts(updatedResponse.data);
                // Cerrar el modal de edición
                closeEditModal();
                // Mostrar mensaje de éxito
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
            Image: file
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
                    <input type="text" id="editName" name="Name" value={updatedProduct.Name} onChange={handleEditChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="editDescription">Descripción</label>
                    <input type="text" id="editDescription" name="Description" value={updatedProduct.Description} onChange={handleEditChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="editCategory">Categoría</label>
                    <select id="editCategory" name="CategoryID" value={updatedProduct.CategoryID} onChange={handleEditChange} required>
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
    <input type="file" id="editImage" name="Image" onChange={handleEditImageChange} accept="image/*" />
</div>
                <div className="form-group price-stock-group">
                    <div className="form-group-half">
                        <label htmlFor="editPrice">Precio</label>
                        <input type="number" id="editPrice" name="Price" value={updatedProduct.Price} onChange={handleEditChange} required />
                    </div>
                    <div className="form-group-half">
                        <label htmlFor="editStock">Stock</label>
                        <input type="number" id="editStock" name="Stock" value={updatedProduct.Stock} onChange={handleEditChange} required />
                    </div>
                </div>
                {/* Aquí puedes agregar más campos según sea necesario */}
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
                                <input type="file" id="image" name="Image" onChange={handleNewProductChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Nombre del producto</label>
                                <input type="text" id="name" placeholder="Nombre del producto" name="Name" value={newProduct.Name} onChange={handleNewProductChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción</label>
                                <input type="text" id="description" placeholder="Descripción" name="Description" value={newProduct.Description} onChange={handleNewProductChange} required />
                            </div>
                            <div className="form-group price-stock-group">
                                <div className="form-group-half">
                                    <label htmlFor="price">Precio</label>
                                    <input type="number" id="price" placeholder="Precio" name="Price" value={newProduct.Price} onChange={handleNewProductChange} required />
                                </div>
                                <div className="form-group-half">
                                    <label htmlFor="stock">Stock</label>
                                    <input type="number" id="stock" placeholder="Stock" name="Stock" value={newProduct.Stock} onChange={handleNewProductChange} required />
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
                                <input type="text" id="categoryName" name="Name" placeholder="Nombre de la categoría" value={newCategory.Name} onChange={handleNewCategoryChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="categoryDescription">Descripción de la categoría</label>
                                <input type="text" id="categoryDescription" name="Description" placeholder="Descripción de la categoría" value={newCategory.Description} onChange={handleNewCategoryChange} required />
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
                                           <img src={`data:image/jpeg;base64,${product.picture}`} alt={product.name} width="50" />
                                        </td>
                                        <td>{product.categoryName}</td>
                                        <td>{product.description}</td>
                                        <td>${product.price.toFixed(2)}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                        <span onClick={() => openEditModal(product)}>
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