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
                console.log('Store loadRepas response:', response);

                // Vérification de la réponse
                if (!response) {
                    throw new Error('Aucune donnée reçue de l\'API');
                }

                // S'assurer que la réponse est un tableau
                const items = Array.isArray(response) ? response : [];
                console.log('Store loadRepas processed items:', items);

                update(state => ({ ...state, items, loading: false }));
            } catch (error) {
                console.error('Store loadRepas error:', error);
                update(state => ({ ...state, error: error.message, loading: false }));
            }
        },
        addRepas: async (repas) => {
            update(state => ({ ...state, loading: true, error: null }));
            try {
                // Debug log
                console.log('Repas à créer:', repas);
                
                // Vérification des compositions
                if (!repas.compositions || !Array.isArray(repas.compositions)) {
                    throw new Error('Les compositions sont requises');
                }

                // Calcul des valeurs nutritionnelles
                const nutritionalValues = calculateNutritionalValues(repas.compositions);
                console.log('Valeurs nutritionnelles calculées:', nutritionalValues);
                
                // Préparation des données
                const repasToCreate = {
                    nom: repas.nom,
                    date: repas.date,
                    description: repas.description || '',
                    compositions: repas.compositions.map(comp => ({
                        produit_id: comp.produit_id,
                        quantite: comp.quantite
                    })),
                    statistiques: [{
                        calories_total: nutritionalValues.calories_total,
                        glucides_total: nutritionalValues.glucides_total,
                        proteines_total: nutritionalValues.proteines_total,
                        lipides_total: nutritionalValues.lipides_total,
                        sel_total: nutritionalValues.sel_total
                    }]
                };

                console.log('Repas préparé pour l\'API:', repasToCreate);

                const newRepas = await api.repas.create(repasToCreate);
                console.log('Réponse de l\'API:', newRepas);

                update(state => ({
                    ...state,
                    items: [...state.items, newRepas],
                    loading: false
                }));
                return newRepas;
            } catch (error) {
                console.error('Erreur création repas:', error);
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