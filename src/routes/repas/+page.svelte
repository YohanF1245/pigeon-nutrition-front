<script>
    import { onMount } from 'svelte';
    import { repas } from '$lib/stores/repas';
    import RepasCard from '$lib/components/repas/RepasCard.svelte';
    import Toast from '$lib/components/common/Toast.svelte';
    import { goto } from '$app/navigation';

    let searchQuery = '';
    let error = '';
    let success = '';

    onMount(() => {
        loadRepas();
    });

    async function loadRepas() {
        try {
            await repas.loadRepas();
        } catch (e) {
            error = "Erreur lors du chargement des repas";
        }
    }

    async function handleDelete(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce repas ?')) {
            try {
                await repas.deleteRepas(id);
                success = 'Repas supprimé avec succès';
            } catch (e) {
                error = "Erreur lors de la suppression du repas";
            }
        }
    }

    $: filteredRepas = $repas.items.filter(r => 
        r.nom.toLowerCase().includes(searchQuery.toLowerCase())
    );
</script>

<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl">Mes Repas</h1>
        <a href="/repas/nouveau" class="btn-primary">
            Ajouter un repas
        </a>
    </div>

    <div class="card mb-6">
        <input
            type="text"
            placeholder="Rechercher un repas..."
            class="input"
            bind:value={searchQuery}
        />
    </div>

    {#if $repas.loading}
        <div class="text-center py-8">
            <p>Chargement...</p>
        </div>
    {:else if filteredRepas.length === 0}
        <div class="card text-center py-8">
            <p class="text-gray-500">Aucun repas trouvé</p>
        </div>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each filteredRepas as repas (repas.id)}
                <RepasCard
                    {repas}
                    on:edit={() => goto(`/repas/${repas.id}`)}
                    on:delete={() => handleDelete(repas.id)}
                />
            {/each}
        </div>
    {/if}
</div>

<Toast
    type="error"
    message={error}
    on:dismiss={() => error = ''}
/>

<Toast
    type="success"
    message={success}
    on:dismiss={() => success = ''}
/> 