import api from './api';

export const UserService = {
    async getUsers(){
        const response =  await  api.get('/users');
        return response.data;
    },
    
    async createUser(data: {
        name: string;
        email: string;
        password: string;
    }){
        const response = await api.post('/users', data);
        return response.data;
    },
    async getUserDetails(id: number){
        const response = await api.get(`/users/${id}`);
        return response.data;
    },
    async updateUser(id: number, data: {
        name?: string;
        email?: string;
        password?: string;
    }){
        const response = await api.put(`/users/${id}`, data);
        return response.data;
    },
    async deleteUser(id: number){
        const response = await api.delete(`/users/${id}`);
        return response.data;
    }
}

