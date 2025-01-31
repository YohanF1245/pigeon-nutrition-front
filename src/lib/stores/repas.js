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
                console.log('Loading repas...');
                const response = await api.repas.getAll();
                console.log('Loaded repas:', response);

                if (!response) {
                    throw new Error('Aucune donnée reçue de l\'API');
                }

                const items = response.repas || [];
                if (!Array.isArray(items)) {
                    throw new Error('Format de données invalide');
                }
                
                console.log('Processed repas items:', items);

                update(state => ({ ...state, items, loading: false }));
                return items;
            } catch (error) {
                console.error('Error loading repas:', error);
                update(state => ({ ...state, error: error.message, loading: false }));
                throw error;
            }
        },
        addRepas: async (repas) => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                console.log('Creating repas:', repas);
                const newRepas = await api.repas.create(repas);
                console.log('Created repas:', newRepas);

                if (!newRepas || !newRepas.id) {
                    throw new Error('Le repas créé est invalide');
                }

                update(state => ({
                    ...state,
                    items: [...state.items, newRepas],
                    loading: false
                }));
                return newRepas;
            } catch (error) {
                console.error('Error creating repas:', error);
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
        getRepas: async (id) => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                console.log('Loading single repas:', id);
                const response = await api.repas.getOne(id);
                console.log('Loaded single repas:', response);

                if (!response || !response.repas) {
                    throw new Error('Repas non trouvé');
                }

                const repas = response.repas;
                console.log('Processed single repas:', repas);
                return repas;
            } catch (error) {
                console.error('Error loading single repas:', error);
                update(state => ({ ...state, error: error.message, loading: false }));
                throw error;
            }
        },
        updateRepas: async (id, repas) => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                console.log('Updating repas:', { id, repas });
                const response = await api.repas.update(id, repas);
                console.log('Update response:', response);

                if (!response || !response.repas) {
                    throw new Error('Erreur lors de la mise à jour du repas');
                }

                const updatedRepas = response.repas;
                console.log('Updated repas:', updatedRepas);

                update(state => ({
                    ...state,
                    items: state.items.map(r => r.id === id ? updatedRepas : r),
                    loading: false
                }));
                return updatedRepas;
            } catch (error) {
                console.error('Error updating repas:', error);
                update(state => ({ ...state, error: error.message, loading: false }));
                throw error;
            }
        }
    };
}

export const repas = createRepasStore(); 