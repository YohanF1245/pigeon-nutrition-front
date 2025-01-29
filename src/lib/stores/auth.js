import { writable } from 'svelte/store';
import api from '$lib/services/api';

export const user = writable(null);
export const isAuthenticated = writable(false);

export const authStore = {
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { 
                email, 
                password 
            });
            
            const { token, user: userData } = response.data;
            
            if (!token) {
                throw new Error('Token non reçu du serveur');
            }
            
            localStorage.setItem('token', token);
            user.set(userData);
            isAuthenticated.set(true);
            
            return { success: true };
        } catch (error) {
            console.error('Erreur de connexion:', error);
            
            // Gestion spécifique des erreurs
            if (error.response?.status === 500) {
                return { 
                    success: false, 
                    error: 'Erreur serveur. Veuillez réessayer plus tard.'
                };
            }
            
            return { 
                success: false, 
                error: error.response?.data?.message || 'Identifiants invalides'
            };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        user.set(null);
        isAuthenticated.set(false);
        window.location.href = '/auth/login';
    },

    checkAuth: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                authStore.logout();
                return false;
            }

            const response = await api.get('/auth/profile');
            user.set(response.data);
            isAuthenticated.set(true);
            return true;
        } catch (error) {
            console.error('Erreur de vérification auth:', error);
            authStore.logout();
            return false;
        }
    }
}; 