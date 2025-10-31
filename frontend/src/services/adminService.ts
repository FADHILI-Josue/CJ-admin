import apiClient from './api';

export interface PendingDevice {
    id: string;
    deviceId: string;
    status: string;
    createdAt: string;
    user: {
        id: string;
        email: string;
        fullName: string;
        createdAt: string;
    };
}

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: string;
    createdAt: string;
    balance: number;
    verifiedDevices: number;
    totalDevices: number;
}

export interface SystemStats {
    totalUsers: number;
    totalDevices: number;
    pendingDevices: number;
    totalTransactions: number;
    totalBalance: number;
}

export const adminService = {
    async getPendingDevices(): Promise<PendingDevice[]> {
        const response = await apiClient.get('/admin/devices/pending');
        return response.data;
    },

    async verifyDevice(deviceId: string): Promise<{ message: string; device: any }> {
        const response = await apiClient.post(`/admin/devices/${deviceId}/verify`);
        return response.data;
    },

    async rejectDevice(deviceId: string): Promise<{ message: string; device: any }> {
        const response = await apiClient.post(`/admin/devices/${deviceId}/reject`);
        return response.data;
    },

    async getUsers(): Promise<User[]> {
        const response = await apiClient.get('/admin/users');
        return response.data;
    },

    async getStats(): Promise<SystemStats> {
        const response = await apiClient.get('/admin/stats');
        return response.data;
    },
};