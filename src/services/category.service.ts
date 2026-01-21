import api from './api';

export const CategoryService = {
    async listCategories(){
        const response =  await  api.get('/categories');
        return response.data;
    },

    async createCategory(data: {
        name: string;
        description: string;
        is_active: boolean;
    }){
        const response = await api.post('/categories', data);
        return response.data;
    },

    async getCategoryDetails(id: number){
        const response = await api.get(`/categories/${id}`);
        return response.data;
    },
    
    async updateCategory(id: number, data: {
        name: string;
        description: string;
        is_active: boolean;
    }){
        const response = await api.put(`/categories/${id}`, data);
        return response.data;
    },

    async deleteCategory(id: number){
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    }
}
