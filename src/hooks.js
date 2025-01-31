import { auth } from '$lib/stores/auth';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';

const publicRoutes = ['/auth/login', '/auth/register'];

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const path = event.url.pathname;
    
    // Si c'est une route publique, on laisse passer
    if (publicRoutes.includes(path)) {
        return await resolve(event);
    }

    // Vérifie le token dans localStorage
    const token = event.cookies.get('token') || 
                 (typeof localStorage !== 'undefined' && localStorage.getItem('token'));

    if (!token) {
        throw redirect(303, '/auth/login');
    }

    const response = await resolve(event);
    return response;
} 