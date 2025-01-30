<script>
    import { goto } from '$app/navigation';
    import { repas } from '$lib/stores/repas';
    import RepasForm from '$lib/components/repas/RepasForm.svelte';
    import Toast from '$lib/components/common/Toast.svelte';

    let loading = false;
    let error = '';

    async function handleSubmit(event) {
        loading = true;
        error = '';

        try {
            await repas.addRepas(event.detail);
            goto('/repas');
        } catch (e) {
            error = e.message || 'Erreur lors de la création du repas';
            loading = false;
        }
    }
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl mb-6">Nouveau Repas</h1>

    <div class="card">
        <RepasForm
            {loading}
            on:submit={handleSubmit}
        />
    </div>
</div>

<Toast
    type="error"
    message={error}
    on:dismiss={() => error = ''}
/> 