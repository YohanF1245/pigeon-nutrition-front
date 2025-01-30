import { writable } from 'svelte/store';
import { api } from '$lib/utils/api';
import { browser } from '$app/environment';

function createAuthStore() {
    const { subscribe, set, update } = writable({
        user: null,
        isAuthenticated: false,
        isLoading: true
    });

    // Initialisation du store avec les données du localStorage
    if (browser) {
        const token = localStorage.getItem('token');
        if (token) {
            checkAuth();
        } else {
            update(state => ({ ...state, isLoading: false }));
        }
    }

    async function checkAuth() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                set({ user: null, isAuthenticated: false, isLoading: false });
                return false;
            }
            const user = await api.auth.getProfile();
            set({ user, isAuthenticated: true, isLoading: false });
            return true;
        } catch (error) {
            console.error('Erreur de vérification auth:', error);
            localStorage.removeItem('token');
            set({ user: null, isAuthenticated: false, isLoading: false });
            return false;
        }
    }

    return {
        subscribe,
        login: async ({ email, password }) => {
            try {
                const response = await api.auth.login({ 
                    email, 
                    mot_de_passe: password 
                });
                
                localStorage.setItem('token', response.token);
                const user = await api.auth.getProfile();
                set({ user, isAuthenticated: true, isLoading: false });
                return { success: true };
            } catch (error) {
                console.error('Erreur de connexion:', error);
                return { 
                    success: false, 
                    error: error.message || 'Identifiants invalides'
                };
            }
        },
        register: async ({ email, password, nom, prenom }) => {
            try {
                await api.auth.register({
                    email,
                    mot_de_passe: password,
                    nom,
                    prenom
                });
                return { success: true };
            } catch (error) {
                console.error('Erreur d\'inscription:', error);
                return { 
                    success: false, 
                    error: error.message || 'Erreur lors de l\'inscription'
                };
            }
        },
        logout: () => {
            localStorage.removeItem('token');
            set({ user: null, isAuthenticated: false, isLoading: false });
        },
        checkAuth
    };
}

export const auth = createAuthStore(); 