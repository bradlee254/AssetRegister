import api from './api';

export const LocationService = {
    async getLocations(){
        const response =  await  api.get('/locations');
        return response.data;
    },
    async createLocation(data: {
        name: string;
        building: string;
        floor: string;
        room: string;
        description: string;
        is_active: boolean;
    }){
        const response = await api.post('/locations', data);
        return response.data;
    },
    async getLocationDetails(id: number){
        const response = await api.get(`/locations/${id}`);
        return response.data;
    },
    async updateLocation(id: number, data: {
        name: string;
        building: string;
        floor: string;
        room: string;
        is_active: boolean;
    }){
        const response = await api.put(`/locations/${id}`, data);
        return response.data;
    },
    async deleteLocation(id: number){
        const response = await api.delete(`/locations/${id}`);
        return response.data;
    }
}