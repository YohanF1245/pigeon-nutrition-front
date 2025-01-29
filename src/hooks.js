import { auth } from '$lib/stores/auth';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';

const publicRoutes = ['/auth/login', '/auth/register'];

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const authStore = get(auth);
    const path = event.url.pathname;

    // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une route protégée
    if (!authStore.isAuthenticated && !publicRoutes.includes(path) && !path.startsWith('/api')) {
        throw redirect(303, '/auth/login');
    }

    // Si l'utilisateur est authentifié et essaie d'accéder aux pages d'auth
    if (authStore.isAuthenticated && publicRoutes.includes(path)) {
        throw redirect(303, '/dashboard');
    }

    const response = await resolve(event);
    return response;
} 