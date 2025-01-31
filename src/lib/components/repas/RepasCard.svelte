<script>
    import { createEventDispatcher } from 'svelte';
    import { format } from 'date-fns';
    import { fr } from 'date-fns/locale';

    export let repas;
    
    const dispatch = createEventDispatcher();

    $: formattedDate = format(new Date(repas.date), 'PPP', { locale: fr });
</script>

<div class="bg-white shadow rounded-lg p-4">
    <div class="flex justify-between items-start mb-4">
        <div>
            <h3 class="text-lg font-medium">{repas.nom}</h3>
            <p class="text-sm text-gray-500">
                {new Date(repas.date).toLocaleString()}
            </p>
            {#if repas.description}
                <p class="text-sm mt-2">{repas.description}</p>
            {/if}
        </div>
        <slot name="actions" />
    </div>

    {#if repas.compositions && repas.compositions.length > 0}
        <div class="mt-4">
            <h4 class="text-sm font-medium mb-2">Composition :</h4>
            <ul class="space-y-1">
                {#each repas.compositions as composition}
                    <li class="text-sm flex justify-between">
                        <span>{composition.produit?.nom || 'Produit inconnu'}</span>
                        <span>{composition.quantite} {composition.produit?.unite_stock || 'unités'}</span>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}

    {#if repas.statistiques?.length > 0}
        <div class="mt-4">
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