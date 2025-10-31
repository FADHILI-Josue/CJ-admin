import apiClient from './api';

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        fullName: string;
        role: string;
    };
}

export const authService = {
    async login(data: LoginData): Promise<AuthResponse> {
        const response = await apiClient.post('/auth/login', data);
        return response.data;
    },
};