<script>
    import { createEventDispatcher } from 'svelte';
    import { UniteStock } from '$lib/utils/constants';

    export let produit;
    export let loading = false;

    const dispatch = createEventDispatcher();

    let adjustment = 0;
    let operation = 'add'; // 'add' ou 'subtract'

    function getStockLabel(unite) {
        switch (unite) {
            case UniteStock.UNITE:
                return 'unité(s)';
            case UniteStock.POURCENTAGE:
                return '%';
            case UniteStock.TRANCHE:
                return 'tranche(s)';
            default:
                return '';
        }
    }

    function handleSubmit() {
        const newStock = operation === 'add' 
            ? produit.stock + adjustment
            : produit.stock - adjustment;

        dispatch('adjust', newStock);
    }

    $: stockLabel = getStockLabel(produit.unite_stock);
</script>

<div class="space-y-6">
    <div class="flex items-center justify-between">
        <div>
            <h3 class="text-lg font-medium">{produit.nom}</h3>
            <p class="text-sm text-gray-500">
                Stock actuel : {produit.stock} {stockLabel}
            </p>
        </div>
        <div class="text-sm text-gray-500">
            Limite : {produit.stock_limite} {stockLabel}
        </div>
    </div>

    <form class="space-y-4" on:submit|preventDefault={handleSubmit}>
        <div>
            <label class="label">Ajustement</label>
            <div class="flex space-x-4">
                <select
                    class="input w-32"
                    bind:value={operation}
                    disabled={loading}
                >
                    <option value="add">Ajouter</option>
                    <option value="subtract">Retirer</option>
                </select>
                <input
                    type="number"
                    step="0.01"
                    class="input flex-1"
                    bind:value={adjustment}
                    min="0"
                    required
                    disabled={loading}
                />
            </div>
        </div>

        <div class="flex justify-end space-x-4">
            <a href="/produits" class="btn-secondary">
                Annuler
            </a>
            <button 
                type="submit" 
                class="btn-primary"
                disabled={loading || adjustment <= 0}
            >
                {loading ? 'Mise à jour...' : 'Mettre à jour le stock'}
            </button>
        </div>
    </form>
</div> 