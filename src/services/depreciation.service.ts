import api from './api';

export const DepreciationService = {
    async listDepreciations(){
        const response =  await  api.get('/depreciation-methods');
        return response.data;
    },
    
    async createDepreciation(data:{
        name: string;
        type: string;
        rate: number;
        useful_life_years: number;
        description: string;
        is_active: boolean;
    }){
        const response = await api.post('/depreciation-methods', data);
        return response.data;
    },
    
    async getDepreciationDetails(id: number){
        const response = await api.get(`/depreciation-methods/${id}`);
        return response.data;
    },

    async updateDepreciation(id: number, data: {
        name: string;
        type: string;
        rate: number;
        useful_life_years: number;
        is_active: boolean;
    }){
        const response = await api.put(`/depreciation-methods/${id}`, data);
        return response.data;
    },

    async deleteDepreciation(id: number){
        const response = await api.delete(`/depreciation-methods/${id}`);
        return response.data;
    }

}