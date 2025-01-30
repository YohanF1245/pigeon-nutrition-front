<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { api } from '$lib/utils/api';
    import { repas } from '$lib/stores/repas';
    import RepasForm from '$lib/components/repas/RepasForm.svelte';
    import Toast from '$lib/components/common/Toast.svelte';

    export let data;
    const { id } = data;

    let repasData;
    let loading = false;
    let error = '';

    onMount(async () => {
        try {
            repasData = await api.repas.getOne(id);
        } catch (e) {
            error = "Erreur lors du chargement du repas";
        }
    });

    async function handleSubmit(event) {
        loading = true;
        error = '';

        try {
            await repas.updateRepas(id, event.detail);
            goto('/repas');
        } catch (e) {
            error = e.message || 'Erreur lors de la modification du repas';
            loading = false;
        }
    }
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl mb-6">Modifier le Repas</h1>

    {#if repasData}
        <div class="card">
            <RepasForm
                repas={repasData}
                {loading}
                on:submit={handleSubmit}
            />
        </div>
    {:else if error}
        <div class="card text-center py-8">
            <p class="text-rose-taupe">{error}</p>
        </div>
    {:else}
        <div class="card text-center py-8">
            <p>Chargement...</p>
        </div>
    {/if}
</div>

<Toast
    type="error"
    message={error}
    on:dismiss={() => error = ''}
/> 