import axios from 'axios';

const API_URL = 'https://api-copyxpress.com.kaizensoftwaresa.com/api';

const getToken = () => {
    return localStorage.getItem('token');
};

export const getAllProducts = async (page, searchTerm) => {
    try {
        const response = await axios.get(`${API_URL}/product/get-all-products`, {
            params: { pageNumber: page, search: searchTerm },
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};


export const addNewProduct = async (formData) => {
    console.log('Datos de la nueva categoría:', formData);
    try {
        const response = await axios.post(`${API_URL}/product/add-new-product`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteExistingProduct = async (productId) => {
    try {
        await axios.delete(`${API_URL}/Product/delete-existing-product/${productId}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
    } catch (error) {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/category/get-all-categories`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const addNewCategory = async (newCategory) => {
    console.log('Datos de la nueva categoría:', newCategory);
    try {
        const response = await axios.post(`${API_URL}/category/add-new-category
            `, newCategory, {
                
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating category:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const productUpdate = async (id, productData) => {
    try {
        const response = await axios.put(`${API_URL}/Product/update-existing-product/${id}`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getAllPrints = async () => {
    try {
        const response = await axios.get(`${API_URL}/Print/get-all-prints`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching prints:', error);
        throw error;
    }
};
