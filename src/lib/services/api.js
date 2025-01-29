import axios from 'axios';
import { API_URL } from '../config/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true  // Important pour les cookies de session
});

// Intercepteur pour ajouter le token JWT si nécessaire
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data || error.message);
        
        if (error.response?.status === 500) {
            console.error('Erreur serveur:', error.response.data);
            return Promise.reject(new Error('Une erreur serveur est survenue. Veuillez réessayer plus tard.'));
        }
        
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
        
        return Promise.reject(error);
    }
);

export default api; 