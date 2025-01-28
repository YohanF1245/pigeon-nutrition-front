<script>
    import { createEventDispatcher } from 'svelte';
    import { UniteStock } from '$lib/utils/constants';

    export let produit;
    
    const dispatch = createEventDispatcher();

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

    $: stockLabel = getStockLabel(produit.unite_stock);
    $: stockBas = produit.stock <= produit.stock_limite;
</script>

<div class="card hover:shadow-lg transition-shadow duration-200">
    <div class="flex justify-between items-start mb-4">
        <div>
            <h3 class="text-lg font-medium text-onyx">{produit.nom}</h3>
            {#if produit.code_barre}
                <p class="text-sm text-gray-500">Code: {produit.code_barre}</p>
            {/if}
        </div>
        <div class="flex space-x-2">
            <button 
                class="btn-secondary p-2"
                on:click={() => dispatch('edit')}
            >
                Modifier
            </button>
            <button 
                class="btn-danger p-2"
                on:click={() => dispatch('delete')}
            >
                Supprimer
            </button>
        </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
            <p class="text-sm font-medium mb-1">Valeurs nutritionnelles</p>
            <ul class="text-sm text-gray-600 space-y-1">
                <li>Calories: {produit.calories} kcal</li>
                <li>Protéines: {produit.proteines}g</li>
                <li>Glucides: {produit.glucides}g</li>
                <li>Lipides: {produit.matieres_grasses}g</li>
                <li>Sel: {produit.sel}g</li>
            </ul>
        </div>
        <div>
            <p class="text-sm font-medium mb-1">Stock</p>
            <div class="flex items-center space-x-2">
                <span class={`text-lg font-medium ${stockBas ? 'text-rose-taupe' : 'text-onyx'}`}>
                    {produit.stock} {stockLabel}
                </span>
                <button 
                    class="btn-secondary p-1 text-sm"
                    on:click={() => dispatch('updateStock')}
                >
                    Ajuster
                </button>
            </div>
            <p class="text-sm text-gray-500 mt-1">
                Limite: {produit.stock_limite} {stockLabel}
            </p>
            <p class="text-sm mt-2">
                Prix: {produit.prix_unitaire.toFixed(2)}€/{stockLabel}
            </p>
        </div>
    </div>

    {#if stockBas}
        <div class="bg-rose-taupe bg-opacity-10 p-2 rounded-md">
            <p class="text-sm text-rose-taupe">
                Stock bas ! Pensez à réapprovisionner.
            </p>
        </div>
    {/if}
</div> 