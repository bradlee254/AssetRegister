import api from './api';

export const LicenseService = {
    async getLicenses(){
        const response =  await  api.get('/licenses');
        return response.data;
    },
    
    async createLicense(data: {
        asset_id: number;
        license_key: string;
        vendor: string;
        purchase_date: string;
        renewal_date: string;
        renewal_cycle: string;
        renewal_cost: number;
        license_cost: number;
        licensed_seats: number;
        support_level: string;
        auto_renew: boolean;
        terms: string;
    }){
        const response = await api.post('/licenses', data);
        return response.data;
    },
    

    async getLicenseDetails(id: number){
        const response = await api.get(`/licenses/${id}`);
        return response.data;
    },
    
    async updateLicense(id: number, data: {
        renewal_date: string;
        renewal_cost: number;
        auto_renew: boolean;
        support_level: string;
    }){
        const response = await api.put(`/licenses/${id}`, data);
        return response.data;
    },
    async renewLicense(id: number, data: {
        new_renewal_date: string;
        renewal_cost: number;
    }){
        const response = await api.post(`/licenses/${id}/renew`, data);
        return response.data;
    },
    async deleteLicense(id: number){
        const response = await api.delete(`/licenses/${id}`);
        return response.data;
    }

}
