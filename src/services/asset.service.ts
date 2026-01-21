import api from './api';

export const AssetService = {
    async getAssets(){
        const response =  await  api.get('/assets');
        return response.data;
    },
    async createAsset(data: {
        name: string;
        serial_number: string;
        asset_type_id: number;
        category_id: number;
        location_id: number;
        department_id: number;
        depreciation_method_id: number;
        purchase_date: string;
        purchase_cost: number;
        useful_life_years: number;
        status: string;
        description: string;
        notes: string;
    }){
        const response = await api.post('/assets', data);
        return response.data;
    },
    async updateAsset(id: number, data: {
        name: string;
        serial_number: string;
        asset_type_id: number;
        category_id: number;
        location_id: number;
        department_id: number;
        depreciation_method_id: number;
        purchase_date: string;
        purchase_cost: number;
        useful_life_years: number;
        status: string;
        description: string;
        notes: string;
    }){
        const response = await api.put(`/assets/${id}`, data);
        return response.data;
    },
    async getAssetDetails(id: number){
        const response = await api.get(`/assets/${id}`);
        return response.data;
    },
    async deleteAsset(id: number){
        const response = await api.delete(`/assets/${id}`);
        return response.data;
    },
    async restoreAsset(id: number){
        const response = await api.post(`/assets/${id}/restore`);
        return response.data;
    },
    async assetDepreciation(id: number){
        const response = await api.get(`/assets/${id}/deprec`);
        return response.data;
    }
}