<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { produits } from '$lib/stores/produits';

    export let loading = false;
    export let repas = null; // Repas existant pour la modification

    const dispatch = createEventDispatcher();

    let nom = '';
    let date = '';
    let description = '';
    let selectedProduit = '';
    let quantite = 0;
    let compositions = [];
    let error = '';

    onMount(async () => {
        await produits.loadProduits();
        
        // Pré-remplir le formulaire si on a un repas existant
        if (repas) {
            console.log('Initializing form with repas:', repas);
            nom = repas.nom;
            // Formater la date pour l'input datetime-local
            date = new Date(repas.date).toISOString().slice(0, 16);
            description = repas.description || '';
            
            // Pré-remplir les compositions
            if (repas.compositions) {
                compositions = repas.compositions.map(comp => ({
                    produit_id: comp.produit_id,
                    produit: comp.produit,
                    quantite: comp.quantite
                }));
                console.log('Initialized compositions:', compositions);
            }
        }
    });

    function handleSubmit() {
        if (!nom) {
            error = "Le nom est requis";
            return;
        }
        if (compositions.length === 0) {
            error = "Ajoutez au moins un produit";
            return;
        }

        const formData = {
            nom,
            date: new Date(date).toISOString(),
            description,
            compositions: compositions.map(comp => ({
                produit_id: comp.produit_id,
                quantite: parseFloat(comp.quantite)
            }))
        };

        console.log('Submitting form data:', formData);
        dispatch('submit', formData);
    }

    function addComposition() {
        if (!selectedProduit || quantite <= 0) return;

        const produit = $produits.items.find(p => p.id === selectedProduit);
        if (!produit) return;

        compositions = [...compositions, {
            produit_id: selectedProduit,
            produit,
            quantite: Number(quantite)
        }];

        selectedProduit = '';
        quantite = 0;
    }

    function removeComposition(index) {
        compositions = compositions.filter((_, i) => i !== index);
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div>
        <label for="nom" class="block text-sm font-medium text-gray-700">Nom</label>
        <input
            type="text"
            id="nom"
            bind:value={nom}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
    </div>

    <div>
        <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
        <input
            type="datetime-local"
            id="date"
            bind:value={date}
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
    </div>

    <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
            id="description"
            bind:value={description}
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
    </div>

    <div class="space-y-4">
        <h3 class="font-medium text-lg">Composition</h3>
        
        <div class="flex gap-4">
            <div class="flex-1">
                <label for="produit" class="label">Produit</label>
                <select
                    id="produit"
                    class="input"
                    bind:value={selectedProduit}
                    disabled={loading}
                >
                    <option value="">Sélectionner un produit</option>
                    {#each $produits.items as produit}
                        <option value={produit.id}>{produit.nom}</option>
                    {/each}
                </select>
            </div>

            <div class="w-32">
                <label for="quantite" class="label">Quantité</label>
                <input
                    id="quantite"
                    type="number"
                    step="0.01"
                    class="input"
                    bind:value={quantite}
                    min="0"
                    disabled={loading}
                />
            </div>

            <div class="flex items-end">
                <button
                    type="button"
                    class="btn-secondary h-10"
                    on:click={addComposition}
                    disabled={loading || !selectedProduit || quantite <= 0}
                >
                    Ajouter
                </button>
            </div>
        </div>

        {#if compositions.length > 0}
            <ul class="space-y-2">
                {#each compositions as composition, index}
                    <li class="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>{composition.produit.nom}</span>
                        <div class="flex items-center space-x-4">
                            <span>{composition.quantite} {composition.produit.unite_stock}</span>
                            <button
                                type="button"
                                class="text-rose-taupe hover:text-opacity-80"
                                on:click={() => removeComposition(index)}
                                disabled={loading}
                            >
                                ×
                            </button>
                        </div>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>

    <div class="flex justify-end space-x-3">
        <button
            type="submit"
            disabled={loading}
            class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
            {loading ? 'Enregistrement...' : repas ? 'Modifier' : 'Créer'}
        </button>
    </div>
</form>

{#if error}
    <div class="text-rose-taupe text-sm mt-2">
        {error}
    </div>
{/if} 