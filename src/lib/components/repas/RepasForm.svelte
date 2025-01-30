<script>
    import { createEventDispatcher } from 'svelte';
    import { produits } from '$lib/stores/produits';
    import { onMount } from 'svelte';

    export let repas = {
        nom: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        compositions: []
    };
    export let loading = false;

    const dispatch = createEventDispatcher();
    let selectedProduit = '';
    let quantite = 0;

    onMount(() => {
        produits.loadProduits();
    });

    function addComposition() {
        if (!selectedProduit || quantite <= 0) return;

        const produit = $produits.items.find(p => p.id === selectedProduit);
        repas.compositions = [...repas.compositions, {
            produit_id: selectedProduit,
            produit,
            quantite
        }];

        selectedProduit = '';
        quantite = 0;
    }

    function removeComposition(index) {
        repas.compositions = repas.compositions.filter((_, i) => i !== index);
    }

    function handleSubmit() {
        dispatch('submit', repas);
    }
</script>

<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
    <div class="space-y-4">
        <div>
            <label for="nom" class="label">Nom du repas*</label>
            <input
                id="nom"
                type="text"
                class="input"
                bind:value={repas.nom}
                required
                disabled={loading}
            />
        </div>

        <div>
            <label for="date" class="label">Date*</label>
            <input
                id="date"
                type="date"
                class="input"
                bind:value={repas.date}
                required
                disabled={loading}
            />
        </div>

        <div>
            <label for="description" class="label">Description</label>
            <textarea
                id="description"
                class="input"
                bind:value={repas.description}
                rows="3"
                disabled={loading}
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

            {#if repas.compositions.length > 0}
                <ul class="space-y-2">
                    {#each repas.compositions as composition, index}
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
    </div>

    <div class="flex justify-end space-x-4">
        <a href="/repas" class="btn-secondary">
            Annuler
        </a>
        <button type="submit" class="btn-primary" disabled={loading || repas.compositions.length === 0}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
    </div>
</form> 