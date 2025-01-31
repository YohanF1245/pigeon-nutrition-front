<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { repas } from '$lib/stores/repas';
    import RepasForm from '$lib/components/repas/RepasForm.svelte';
    import Toast from '$lib/components/common/Toast.svelte';

    let loading = false;
    let error = '';
    let currentRepas = null;

    onMount(async () => {
        try {
            loading = true;
            const id = $page.params.id;
            console.log('Loading repas for edit:', id);
            currentRepas = await repas.getRepas(id);
            console.log('Loaded repas for edit:', currentRepas);
        } catch (e) {
            console.error('Error loading repas for edit:', e);
            error = e.message || 'Erreur lors du chargement du repas';
        } finally {
            loading = false;
        }
    });

    async function handleSubmit(event) {
        loading = true;
        error = '';

        try {
            const id = $page.params.id;
            console.log('Submitting edit form:', { id, data: event.detail });
            await repas.updateRepas(id, event.detail);
            console.log('Edit successful');
            await goto('/repas');
        } catch (e) {
            console.error('Error in edit submit:', e);
            error = e.message || 'Erreur lors de la modification du repas';
            loading = false;
        }
    }
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl mb-6">Modifier le Repas</h1>

    <div class="card">
        {#if currentRepas}
            <RepasForm
                {loading}
                repas={currentRepas}
                on:submit={handleSubmit}
            />
        {:else if loading}
            <div class="text-center py-8">
                <p>Chargement...</p>
            </div>
        {:else if error}
            <div class="bg-rose-taupe bg-opacity-10 p-4 rounded-lg">
                <p class="text-rose-taupe">{error}</p>
            </div>
        {/if}
    </div>
</div>

<Toast
    type="error"
    message={error}
    on:dismiss={() => error = ''}
/> 