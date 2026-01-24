import api from './api';

export const DepartmentService = {
    async getDepartments(){
        const response =  await  api.get('/departments');
        return response.data;
    },

    async createDepartment(data: {
        name: string;
        code: string;
        description: string;
        manager_id: number;
        is_active: boolean;
    }){
        const response = await api.post('/departments', data);
        return response.data;
    },

    async updateDepartment(id: number, data: {
        name: string;
        code: string;
        description: string;
        manager_id: number;
        is_active: boolean;
    }){
        const response = await api.put(`/departments/${id}`, data);
        return response.data;
    },

    async deleteDepartment(id: number){
        const response = await api.delete(`/departments/${id}`);
        return response.data;
    },
    
}