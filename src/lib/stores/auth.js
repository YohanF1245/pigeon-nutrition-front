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
        login: async (credentials) => {
            try {
                const response = await api.auth.login(credentials);
                localStorage.setItem('token', response.token);
                const user = await api.auth.getProfile();
                set({ user, isAuthenticated: true, isLoading: false });
                return true;
            } catch (error) {
                console.error('Erreur de connexion:', error);
                return false;
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
                    return;
                }
                const user = await api.auth.getProfile();
                set({ user, isAuthenticated: true, isLoading: false });
            } catch (error) {
                localStorage.removeItem('token');
                set({ user: null, isAuthenticated: false, isLoading: false });
            }
        }
    };
}

export const auth = createAuthStore(); 