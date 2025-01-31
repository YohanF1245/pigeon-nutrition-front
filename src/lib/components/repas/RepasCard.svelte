<script>
    import { createEventDispatcher } from 'svelte';
    import { format } from 'date-fns';
    import { fr } from 'date-fns/locale';
    import RepasDetailModal from './RepasDetailModal.svelte';

    export let repas;
    
    const dispatch = createEventDispatcher();
    let showModal = false;

    $: formattedDate = format(new Date(repas.date), 'PPP', { locale: fr });
</script>

<div class="bg-white shadow rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
    <div class="flex justify-between items-start mb-4">
        <div class="cursor-pointer" on:click={() => showModal = true}>
            <h3 class="text-lg font-medium text-onyx">{repas.nom}</h3>
            <p class="text-sm text-gray-500">{formattedDate}</p>
        </div>
    </div>

    {#if repas.compositions && repas.compositions.length > 0}
        <ul class="space-y-1 mb-4">
            {#each repas.compositions as composition}
                <li class="text-sm flex justify-between items-center py-1">
                    <span class="font-medium">{composition.produit?.nom || 'Produit inconnu'}</span>
                    <span class="text-gray-500">
                        {composition.quantite} {composition.produit?.unite_stock || 'unités'}
                    </span>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="text-sm text-gray-500 italic mb-4">Aucun produit dans ce repas</p>
    {/if}

    {#if repas.statistiques?.length > 0}
        <div class="mt-4 bg-lavender-web bg-opacity-50 p-3 rounded">
            <h4 class="text-sm font-medium mb-2">Valeurs nutritionnelles totales</h4>
            <div class="grid grid-cols-2 gap-4 text-sm">
                <div>Calories: <span class="font-medium">{Math.round(repas.statistiques[0].calories_total)} kcal</span></div>
                <div>Protéines: <span class="font-medium">{repas.statistiques[0].proteines_total.toFixed(1)}g</span></div>
                <div>Glucides: <span class="font-medium">{repas.statistiques[0].glucides_total.toFixed(1)}g</span></div>
                <div>Lipides: <span class="font-medium">{repas.statistiques[0].lipides_total.toFixed(1)}g</span></div>
                <div>Sel: <span class="font-medium">{repas.statistiques[0].sel_total.toFixed(2)}g</span></div>
            </div>
        </div>
    {/if}

    <div class="flex justify-end space-x-2 mt-4 pt-3 border-t">
        <button 
            class="btn-secondary px-3 py-1"
            on:click={() => dispatch('edit')}
        >
            Modifier
        </button>
        <button 
            class="btn-danger px-3 py-1"
            on:click={() => dispatch('delete')}
        >
            Supprimer
        </button>
    </div>
</div>

{#if showModal}
    <RepasDetailModal 
        {repas} 
        on:close={() => showModal = false}
    />
{/if} 