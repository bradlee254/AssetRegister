import api from './api';

export const AssetTypesService = {
    async getAssetTypes(){
        const response =  await  api.get('/types');
        return response.data;
    },
    async createAssetType(data: {
        name: string;
        category: number;
        description: string;
        expected_useful_life_months: number;
        warranty_period: number;
        is_active: boolean;

    }){
        const response = await api.post('/types', data);
        return response.data;
    },
    async getAssetTypeDetails(id: number){
        const response = await api.get(`/types/${id}`);
        return response.data;
    },
    async updateAssetType(id: number, data: {
        name: string;
        category: number;
        expected_useful_life_months: number;
        warranty_period: number;
        is_active: boolean;
    }){
        const response = await api.put(`/types/${id}`, data);
        return response.data;
    },
    async deleteAssetType(id: number){
        const response = await api.delete(`/types/${id}`);
        return response.data;
    }
}