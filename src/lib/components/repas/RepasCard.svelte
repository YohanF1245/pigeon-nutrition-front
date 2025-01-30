<script>
    import { createEventDispatcher } from 'svelte';
    import { format } from 'date-fns';
    import { fr } from 'date-fns/locale';

    export let repas;
    
    const dispatch = createEventDispatcher();

    $: formattedDate = format(new Date(repas.date), 'PPP', { locale: fr });
</script>

<div class="card hover:shadow-lg transition-shadow duration-200">
    <div class="flex justify-between items-start mb-4">
        <div>
            <h3 class="text-lg font-medium text-onyx">{repas.nom}</h3>
            <p class="text-sm text-gray-500">{formattedDate}</p>
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

    {#if repas.description}
        <p class="text-gray-600 mb-4">{repas.description}</p>
    {/if}

    <div class="space-y-4">
        <div>
            <h4 class="text-sm font-medium mb-2">Composition</h4>
            <ul class="space-y-2">
                {#each repas.compositions as composition}
                    <li class="flex justify-between text-sm">
                        <span>{composition.produit.nom}</span>
                        <span>{composition.quantite} {composition.produit.unite_stock}</span>
                    </li>
                {/each}
            </ul>
        </div>

        {#if repas.statistiques?.length > 0}
            <div>
                <h4 class="text-sm font-medium mb-2">Valeurs nutritionnelles</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>Calories: {repas.statistiques[0].calories_total} kcal</div>
                    <div>Protéines: {repas.statistiques[0].proteines_total}g</div>
                    <div>Glucides: {repas.statistiques[0].glucides_total}g</div>
                    <div>Lipides: {repas.statistiques[0].lipides_total}g</div>
                    <div>Sel: {repas.statistiques[0].sel_total}g</div>
                </div>
            </div>
        {/if}
    </div>
</div> 