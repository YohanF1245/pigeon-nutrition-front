<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { repas } from '$lib/stores/repas';
    import RepasCard from '$lib/components/repas/RepasCard.svelte';
    import ConfirmDialog from '$lib/components/common/ConfirmDialog.svelte';
    import Toast from '$lib/components/common/Toast.svelte';

    let searchQuery = '';
    let error = '';
    let success = '';
    let showConfirmDelete = false;
    let repasToDelete = null;
    let filteredRepas = [];

    onMount(() => {
        loadRepas();
    });

    async function loadRepas() {
        try {
            await repas.loadRepas();
            console.log('Store state:', $repas);
        } catch (e) {
            console.error('Error loading repas:', e);
            error = "Erreur lors du chargement des repas";
        }
    }

    function confirmDelete(id) {
        repasToDelete = id;
        showConfirmDelete = true;
    }

    async function handleDelete() {
        try {
            await repas.deleteRepas(repasToDelete);
            success = 'Repas supprimé avec succès';
            repasToDelete = null;
        } catch (e) {
            error = "Erreur lors de la suppression du repas";
        }
    }

    $: {
        if ($repas && $repas.items) {
            filteredRepas = $repas.items.filter(r => 
                r && r.nom && r.nom.toLowerCase().includes((searchQuery || '').toLowerCase())
            );
        } else {
            filteredRepas = [];
        }
    }
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
                    on:delete={() => confirmDelete(repas.id)}
                />
            {/each}
        </div>
    {/if}
</div>

<ConfirmDialog
    bind:show={showConfirmDelete}
    title="Supprimer le repas"
    message="Êtes-vous sûr de vouloir supprimer ce repas ? Cette action est irréversible."
    on:confirm={handleDelete}
    on:cancel={() => repasToDelete = null}
/>

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