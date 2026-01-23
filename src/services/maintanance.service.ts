import api from './api';

export const MaintananceService = {
    async getMaintenances(){
        const response =  await  api.get('/maintenance');
        return response.data;
    },

    async recordMaintenance(data: {
        asset_id: number;
        maintenance_date: string;
        work_description: string;
        technician_name: string;
        cost: number;
        type: string;
        next_maintenance_due: string;
        notes: string;
    }){
        const response = await api.post('/maintenance', data);
        return response.data;
    }  ,
    async getMaintenanceDetails(id: number){
        const response = await api.get(`/maintenance/${id}`);
        return response.data;
    },
    async updateMaintenance(id: number, data: {
       work_description: string;
       cost: string;
       type: string;
       notes: string;
    }){
        const response = await api.put(`/maintenance/${id}`, data);
        return response.data;
    },
    async deleteMaintenance(id: number){
        const response = await api.delete(`/maintenance/${id}`);
        return response.data;
    }

}