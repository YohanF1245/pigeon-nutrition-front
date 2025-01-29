import { writable } from 'svelte/store';
import { api } from '$lib/utils/api';

function createAuthStore() {
    const { subscribe, set, update } = writable({
        user: null,
        isAuthenticated: false,
        isLoading: true
    });

    return {
        subscribe,
        login: async ({ email, password }) => {
            try {
                console.log('Tentative de connexion avec:', { email, mot_de_passe: password });
                const response = await api.auth.login({ 
                    email, 
                    mot_de_passe: password 
                });
                console.log('Réponse de connexion:', response);
                
                localStorage.setItem('token', response.token);
                const user = await api.auth.getProfile();
                console.log('Profil utilisateur:', user);
                
                set({ user, isAuthenticated: true, isLoading: false });
                return { success: true };
            } catch (error) {
                console.error('Erreur de connexion détaillée:', error);
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
        checkAuth: async () => {
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
    };
}

export const auth = createAuthStore(); 