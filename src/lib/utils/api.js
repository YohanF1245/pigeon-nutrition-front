const API_BASE_URL = 'http://localhost:3000/api';

async function fetchWithAuth(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Une erreur est survenue');
    }

    return response.json();
}

export const api = {
    auth: {
        login: (credentials) => fetchWithAuth('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        }),
        register: (userData) => fetchWithAuth('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        }),
        getProfile: () => fetchWithAuth('/auth/profile'),
        updateProfile: (userData) => fetchWithAuth('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(userData)
        })
    },
    produits: {
        getAll: () => fetchWithAuth('/produits'),
        getOne: (id) => fetchWithAuth(`/produits/${id}`),
        create: (produit) => fetchWithAuth('/produits', {
            method: 'POST',
            body: JSON.stringify(produit)
        }),
        update: (id, produit) => fetchWithAuth(`/produits/${id}`, {
            method: 'PUT',
            body: JSON.stringify(produit)
        }),
        delete: (id) => fetchWithAuth(`/produits/${id}`, {
            method: 'DELETE'
        }),
        updateStock: (id, stock) => fetchWithAuth(`/produits/${id}/stock`, {
            method: 'PATCH',
            body: JSON.stringify({ stock })
        }),
        getStocksBas: () => fetchWithAuth('/produits/stocks/bas')
    },
    repas: {
        getAll: () => fetchWithAuth('/repas'),
        getOne: (id) => fetchWithAuth(`/repas/${id}`),
        create: (repas) => fetchWithAuth('/repas', {
            method: 'POST',
            body: JSON.stringify(repas)
        }),
        update: (id, repas) => fetchWithAuth(`/repas/${id}`, {
            method: 'PUT',
            body: JSON.stringify(repas)
        }),
        delete: (id) => fetchWithAuth(`/repas/${id}`, {
            method: 'DELETE'
        }),
        addComposition: (id, compositions) => fetchWithAuth(`/repas/${id}/compositions`, {
            method: 'POST',
            body: JSON.stringify(compositions)
        }),
        getStatistiques: (id) => fetchWithAuth(`/repas/${id}/statistiques`)
    }
}; 