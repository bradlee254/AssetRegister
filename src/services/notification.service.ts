import api from './api'

export const notificationService = {
    async listNotifications(){
        const response = await api.get('/notification-schedules');
        return response.data;

    },
    async createNotification(data: {
        notifiable_type: string;
        notifiable_id: number;
        event_type: string;
        notification_type: string;
        days_before: number;
        is_active: boolean;
        recipients: [];
        message_template: string;

    }){
        const response = await api.post('/notification-schedules', data);
        return response.data;
    },
    async getNotifications(id: number){
        const response = await api.get(`/notification-schedules/${id}`);
        return response.data;

    },
    async updateNotification(id: number, data: {
        days_before: number;
        is_active: boolean;
        recipients: number;
        message_template: string;
    }){
        const response = await api.put(`/notification-schedules/${id}`, data);
        return response.data;
    },

    async deleteNotification(id: number){
        const response = await api.delete(`/notification-schedules/${id}`);
        return response.data;
    }
}