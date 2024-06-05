// api.js
import axios from 'axios';

const API_URL = 'http://api-shop.somee.com/api';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvbWVscGljaHVjaG9AZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6InJ2cGljaHVjaG8iLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MTczODQ2NTUsImV4cCI6MTcxODI0ODY1NSwiaWF0IjoxNzE3Mzg0NjU1LCJpc3MiOiJodHRwOi8vYXBpLXNob3Auc29tZWUuY29tIn0.Vp_351K11_mG8MuXORTZXC2L-cts5rqe0Q0ivjlUzh4';
export const getAllProducts = async (page, searchTerm) => {
    try {
        const response = await axios.get(`${API_URL}/Product/get-all-products?pageNumber=${page}&search=${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const addNewProduct = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/Product/add-new-product`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
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
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/Category/get-all-categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const addNewCategory = async (newCategory) => {
    try {
        const response = await axios.post(`${API_URL}/Category/add-new-category`, newCategory, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating category:', error.response ? error.response.data : error.message);
        throw error;
    }
};
export const productUpdate=async(id,productData)=>{
try{
  const response = await axios.put(`${API_URL}/Product/update-existing-product/${id}`, productData, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    }
});
return response.data;
}catch(error){
console.error('Error updating category:', error.response ? error.response.data : error.message);
throw error;
}
};

/////////////
export const getAllPrints = async () => {
    try {
        const response = await axios.get(`${API_URL}/Print/get-all-prints`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching prints:', error);
        throw error;
    }
};
