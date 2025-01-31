<script>
    import { createEventDispatcher } from 'svelte';
    import { format } from 'date-fns';
    import { fr } from 'date-fns/locale';

    export let repas;
    
    const dispatch = createEventDispatcher();
    
    $: formattedDate = format(new Date(repas.date), 'PPP', { locale: fr });

    function close() {
        dispatch('close');
    }

    // Calcul des totaux
    $: totals = (repas.compositions || []).reduce((acc: any, comp: any) => {
        const ratio = comp.quantite / 100;
        return {
            calories: acc.calories + (comp.produit?.calories || 0) * ratio,
            proteines: acc.proteines + (comp.produit?.proteines || 0) * ratio,
            glucides: acc.glucides + (comp.produit?.glucides || 0) * ratio,
            lipides: acc.lipides + (comp.produit?.matieres_grasses || 0) * ratio,
            sel: acc.sel + (comp.produit?.sel || 0) * ratio
        };
    }, { calories: 0, proteines: 0, glucides: 0, lipides: 0, sel: 0 });
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" on:click={close}>
    <div class="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto" on:click|stopPropagation>
        <!-- En-tête -->
        <div class="mb-6">
            <h2 class="text-2xl font-medium text-onyx">{repas.nom}</h2>
            <p class="text-gray-500">{formattedDate}</p>
            {#if repas.description}
                <p class="mt-2 text-gray-600">{repas.description}</p>
            {/if}
        </div>

        <!-- Tableau des ingrédients -->
        {#if repas.compositions && repas.compositions.length > 0}
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="text-left p-2">Ingrédient</th>
                            <th class="text-right p-2">Quantité</th>
                            <th class="text-right p-2">Calories</th>
                            <th class="text-right p-2">Protéines</th>
                            <th class="text-right p-2">Glucides</th>
                            <th class="text-right p-2">Lipides</th>
                            <th class="text-right p-2">Sel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each repas.compositions as comp}
                            <tr class="border-b">
                                <td class="p-2">{comp.produit?.nom || 'Produit inconnu'}</td>
                                <td class="text-right p-2">{comp.quantite} {comp.produit?.unite_stock}</td>
                                <td class="text-right p-2">{Math.round((comp.produit?.calories || 0) * comp.quantite / 100)} kcal</td>
                                <td class="text-right p-2">{((comp.produit?.proteines || 0) * comp.quantite / 100).toFixed(1)}g</td>
                                <td class="text-right p-2">{((comp.produit?.glucides || 0) * comp.quantite / 100).toFixed(1)}g</td>
                                <td class="text-right p-2">{((comp.produit?.matieres_grasses || 0) * comp.quantite / 100).toFixed(1)}g</td>
                                <td class="text-right p-2">{((comp.produit?.sel || 0) * comp.quantite / 100).toFixed(2)}g</td>
                            </tr>
                        {/each}
                        <!-- Ligne des totaux -->
                        <tr class="bg-lavender-web bg-opacity-50 font-medium">
                            <td class="p-2" colspan="2">Total</td>
                            <td class="text-right p-2">{Math.round(totals.calories)} kcal</td>
                            <td class="text-right p-2">{totals.proteines.toFixed(1)}g</td>
                            <td class="text-right p-2">{totals.glucides.toFixed(1)}g</td>
                            <td class="text-right p-2">{totals.lipides.toFixed(1)}g</td>
                            <td class="text-right p-2">{totals.sel.toFixed(2)}g</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        {:else}
            <div class="text-center py-8 text-gray-500">
                <p>Aucun produit n'a été ajouté à ce repas.</p>
                <p class="text-sm mt-2">Cliquez sur "Modifier" pour ajouter des produits.</p>
            </div>
        {/if}

        <!-- Footer -->
        <div class="mt-6 flex justify-end">
            <button 
                class="btn-secondary px-4 py-2"
                on:click={close}
            >
                Fermer
            </button>
        </div>
    </div>
</div> 