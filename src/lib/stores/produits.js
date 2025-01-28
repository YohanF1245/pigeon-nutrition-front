import { writable } from 'svelte/store';
import { api } from '$lib/utils/api';

function createProduitsStore() {
    const { subscribe, set, update } = writable({
        items: [],
        loading: false,
        error: null,
        stocksBas: []
    });

    return {
        subscribe,
        loadProduits: async () => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                const produits = await api.produits.getAll();
                update(state => ({ ...state, items: produits, loading: false }));
            } catch (error) {
                update(state => ({ ...state, error: error.message, loading: false }));
            }
        },
        loadStocksBas: async () => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                const stocksBas = await api.produits.getStocksBas();
                update(state => ({ ...state, stocksBas, loading: false }));
            } catch (error) {
                update(state => ({ ...state, error: error.message, loading: false }));
            }
        },
        addProduit: async (produit) => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                const newProduit = await api.produits.create(produit);
                update(state => ({
                    ...state,
                    items: [...state.items, newProduit],
                    loading: false
                }));
                return newProduit;
            } catch (error) {
                update(state => ({ ...state, error: error.message, loading: false }));
                throw error;
            }
        },
        updateProduit: async (id, produit) => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                const updatedProduit = await api.produits.update(id, produit);
                update(state => ({
                    ...state,
                    items: state.items.map(p => p.id === id ? updatedProduit : p),
                    loading: false
                }));
                return updatedProduit;
            } catch (error) {
                update(state => ({ ...state, error: error.message, loading: false }));
                throw error;
            }
        },
        updateStock: async (id, stock) => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                await api.produits.updateStock(id, stock);
                update(state => ({
                    ...state,
                    items: state.items.map(p => p.id === id ? { ...p, stock } : p),
                    loading: false
                }));
            } catch (error) {
                update(state => ({ ...state, error: error.message, loading: false }));
                throw error;
            }
        },
        deleteProduit: async (id) => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                await api.produits.delete(id);
                update(state => ({
                    ...state,
                    items: state.items.filter(p => p.id !== id),
                    loading: false
                }));
            } catch (error) {
                update(state => ({ ...state, error: error.message, loading: false }));
                throw error;
            }
        }
    };
}

export const produits = createProduitsStore(); 