<script>
    import { createEventDispatcher } from 'svelte';
    import { UniteStock } from '$lib/utils/constants';

    export let produit = {
        nom: '',
        code_barre: '',
        calories: 0,
        matieres_grasses: 0,
        glucides: 0,
        proteines: 0,
        sel: 0,
        stock: 0,
        unite_stock: UniteStock.UNITE,
        prix_unitaire: 0,
        stock_limite: 0
    };

    export let loading = false;

    const dispatch = createEventDispatcher();

    const uniteStockOptions = [
        { value: UniteStock.UNITE, label: 'Unité(s)' },
        { value: UniteStock.POURCENTAGE, label: 'Pourcentage' },
        { value: UniteStock.TRANCHE, label: 'Tranche(s)' }
    ];

    function handleSubmit() {
        dispatch('submit', produit);
    }
</script>

<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Informations de base -->
        <div class="space-y-4">
            <div>
                <label for="nom" class="label">Nom du produit*</label>
                <input
                    id="nom"
                    type="text"
                    class="input"
                    bind:value={produit.nom}
                    required
                    disabled={loading}
                />
            </div>

            <div>
                <label for="code_barre" class="label">Code-barres</label>
                <input
                    id="code_barre"
                    type="text"
                    class="input"
                    bind:value={produit.code_barre}
                    disabled={loading}
                />
            </div>
        </div>

        <!-- Valeurs nutritionnelles -->
        <div class="space-y-4">
            <h3 class="font-medium text-lg">Valeurs nutritionnelles</h3>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="calories" class="label">Calories (kcal)*</label>
                    <input
                        id="calories"
                        type="number"
                        step="0.01"
                        class="input"
                        bind:value={produit.calories}
                        required
                        min="0"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label for="proteines" class="label">Protéines (g)*</label>
                    <input
                        id="proteines"
                        type="number"
                        step="0.01"
                        class="input"
                        bind:value={produit.proteines}
                        required
                        min="0"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label for="glucides" class="label">Glucides (g)*</label>
                    <input
                        id="glucides"
                        type="number"
                        step="0.01"
                        class="input"
                        bind:value={produit.glucides}
                        required
                        min="0"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label for="matieres_grasses" class="label">Lipides (g)*</label>
                    <input
                        id="matieres_grasses"
                        type="number"
                        step="0.01"
                        class="input"
                        bind:value={produit.matieres_grasses}
                        required
                        min="0"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label for="sel" class="label">Sel (g)*</label>
                    <input
                        id="sel"
                        type="number"
                        step="0.01"
                        class="input"
                        bind:value={produit.sel}
                        required
                        min="0"
                        disabled={loading}
                    />
                </div>
            </div>
        </div>

        <!-- Gestion des stocks -->
        <div class="space-y-4">
            <h3 class="font-medium text-lg">Gestion des stocks</h3>

            <div>
                <label for="unite_stock" class="label">Unité de stock*</label>
                <select
                    id="unite_stock"
                    class="input"
                    bind:value={produit.unite_stock}
                    disabled={loading}
                >
                    {#each uniteStockOptions as option}
                        <option value={option.value}>{option.label}</option>
                    {/each}
                </select>
            </div>

            <div>
                <label for="stock" class="label">Stock initial*</label>
                <input
                    id="stock"
                    type="number"
                    step="0.01"
                    class="input"
                    bind:value={produit.stock}
                    required
                    min="0"
                    disabled={loading}
                />
            </div>

            <div>
                <label for="stock_limite" class="label">Stock limite*</label>
                <input
                    id="stock_limite"
                    type="number"
                    step="0.01"
                    class="input"
                    bind:value={produit.stock_limite}
                    required
                    min="0"
                    disabled={loading}
                />
            </div>

            <div>
                <label for="prix_unitaire" class="label">Prix unitaire (€)*</label>
                <input
                    id="prix_unitaire"
                    type="number"
                    step="0.01"
                    class="input"
                    bind:value={produit.prix_unitaire}
                    required
                    min="0"
                    disabled={loading}
                />
            </div>
        </div>
    </div>

    <div class="flex justify-end space-x-4">
        <a href="/produits" class="btn-secondary">
            Annuler
        </a>
        <button type="submit" class="btn-primary" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
    </div>
</form> 