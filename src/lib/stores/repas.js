import { writable } from 'svelte/store';
import { api } from '$lib/utils/api';

function createRepasStore() {
    const { subscribe, set, update } = writable({
        items: [],
        loading: false,
        error: null
    });

    function calculateNutritionalValues(compositions) {
        return compositions.reduce((acc, comp) => {
            const { produit, quantite } = comp;
            const ratio = quantite / 100; // Les valeurs nutritionnelles sont pour 100g/ml

            return {
                calories_total: acc.calories_total + (produit.calories * ratio),
                glucides_total: acc.glucides_total + (produit.glucides * ratio),
                proteines_total: acc.proteines_total + (produit.proteines * ratio),
                lipides_total: acc.lipides_total + (produit.matieres_grasses * ratio),
                sel_total: acc.sel_total + (produit.sel * ratio)
            };
        }, {
            calories_total: 0,
            glucides_total: 0,
            proteines_total: 0,
            lipides_total: 0,
            sel_total: 0
        });
    }

    return {
        subscribe,
        loadRepas: async () => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                const response = await api.repas.getAll();
                console.log('Response from API:', response);
                const items = Array.isArray(response) ? response : [];
                console.log('Processed items:', items);
                update(state => ({ ...state, items, loading: false }));
            } catch (error) {
                console.error('Erreur chargement repas:', error);
                update(state => ({ ...state, error: error.message, loading: false }));
            }
        },
        addRepas: async (repas) => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                // Calcul des valeurs nutritionnelles
                const nutritionalValues = calculateNutritionalValues(repas.compositions);
                
                // Ajout des statistiques au repas
                const repasWithStats = {
                    ...repas,
                    statistiques: [nutritionalValues]
                };

                const newRepas = await api.repas.create(repasWithStats);
                update(state => ({
                    ...state,
                    items: [...state.items, newRepas],
                    loading: false
                }));
                return newRepas;
            } catch (error) {
                update(state => ({ ...state, error: error.message, loading: false }));
                throw error;
            }
        },
        deleteRepas: async (id) => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                await api.repas.delete(id);
                update(state => ({
                    ...state,
                    items: state.items.filter(r => r.id !== id),
                    loading: false
                }));
            } catch (error) {
                update(state => ({ ...state, error: error.message, loading: false }));
                throw error;
            }
        },
        updateRepas: async (id, repas) => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                const updatedRepas = await api.repas.update(id, repas);
                update(state => ({
                    ...state,
                    items: state.items.map(r => r.id === id ? updatedRepas : r),
                    loading: false
                }));
                return updatedRepas;
            } catch (error) {
                update(state => ({ ...state, error: error.message, loading: false }));
                throw error;
            }
        }
    };
}

export const repas = createRepasStore(); 