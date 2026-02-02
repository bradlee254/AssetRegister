import api from "./api"

 export const AuditService ={
    async listAuditLogs(){
        const response = await api.get('/audit-logs');
        return response.data;

    },
    async getAuditDetails(id: number){
        const response = await api.get(`/audit-logs/${id}`);
        return response.data;
    },
     async deleteAuditLog(id: number){
        const response = await api.delete(`/audit-logs/${id}`);
        return response.data;
     }
 }