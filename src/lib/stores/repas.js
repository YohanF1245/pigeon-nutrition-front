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
                // 1. Créer d'abord le repas sans les compositions
                const repasData = {
                    nom: repas.nom,
                    date: repas.date,
                    description: repas.description
                };

                const response = await api.repas.create(repasData);
                console.log('Created repas response:', response);

                if (!response || !response.repas) {
                    throw new Error('Réponse invalide de l\'API');
                }

                const newRepas = response.repas;
                console.log('Created repas:', newRepas);

                // 2. Si le repas a des compositions, les ajouter
                if (repas.compositions && repas.compositions.length > 0) {
                    console.log('Adding compositions:', repas.compositions);
                    await api.repas.addComposition(newRepas.id, {
                        compositions: repas.compositions.map(comp => ({
                            produit_id: comp.produit_id,
                            quantite: Number(comp.quantite)
                        }))
                    });
                }

                // 3. Recharger le repas complet
                const updatedRepas = await api.repas.getOne(newRepas.id);
                
                update(state => ({
                    ...state,
                    items: [...state.items, updatedRepas.repas],
                    loading: false
                }));
                return updatedRepas.repas;
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
                // 1. Mettre à jour les infos du repas
                const repasData = {
                    nom: repas.nom,
                    date: repas.date,
                    description: repas.description
                };

                await api.repas.update(id, repasData);

                // 2. Mettre à jour les compositions
                if (repas.compositions && repas.compositions.length > 0) {
                    console.log('Updating compositions:', repas.compositions);
                    await api.repas.updateCompositions(id, {
                        compositions: repas.compositions.map(comp => ({
                            produit_id: comp.produit_id,
                            quantite: Number(comp.quantite)
                        }))
                    });
                }

                // 3. Recharger le repas complet
                const response = await api.repas.getOne(id);
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