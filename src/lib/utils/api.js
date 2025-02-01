const API_BASE_URL = import.meta.env.VITE_API_URL;

async function fetchWithAuth(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    const url = `${API_BASE_URL}${endpoint}`;
    console.log('🚀 Sending request to:', url, {
        method: options.method || 'GET',
        headers: defaultHeaders,
        body: options.body
    });

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            }
        });

        console.log('📥 Response status:', response.status);
        
        if (!response.ok) {
            const text = await response.text();
            console.error('❌ Response error:', text);
            throw new Error(text || 'Une erreur est survenue');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('📦 Response data:', data);
            return data;
        } else {
            const text = await response.text();
            console.error('Response not JSON:', text);
            throw new Error('Réponse invalide du serveur');
        }
    } catch (error) {
        console.error('❌ Fetch error:', error);
        throw error;
    }
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
        getAll: async () => {
            try {
                const response = await fetchWithAuth('/repas');
                console.log('API getAll repas response:', response);
                return response;
            } catch (error) {
                console.error('API getAll repas error:', error);
                throw error;
            }
        },
        getOne: (id) => fetchWithAuth(`/repas/${id}`),
        create: async (data) => {
            console.log('API create repas data:', data);
            return fetchWithAuth('/repas', {
                method: 'POST',
                body: JSON.stringify(data)
            });
        },
        update: async (id, data) => {
            console.log('API update repas data:', { id, data });
            return fetchWithAuth(`/repas/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data)
            });
        },
        delete: (id) => fetchWithAuth(`/repas/${id}`, {
            method: 'DELETE'
        }),
        addComposition: (id, compositions) => fetchWithAuth(`/repas/${id}/compositions`, {
            method: 'POST',
            body: JSON.stringify(compositions)
        }),
        updateCompositions: (id, compositions) => fetchWithAuth(`/repas/${id}/compositions`, {
            method: 'PUT',
            body: JSON.stringify(compositions)
        }),
        deleteCompositions: (id, compositionIds) => fetchWithAuth(`/repas/${id}/compositions`, {
            method: 'DELETE',
            body: JSON.stringify({ composition_ids: compositionIds })
        }),
        getStatistiques: (id) => fetchWithAuth(`/repas/${id}/statistiques`)
    }
}; 