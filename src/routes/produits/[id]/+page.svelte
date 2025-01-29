<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { produits } from '$lib/stores/produits';
    import ProduitForm from '$lib/components/produits/ProduitForm.svelte';
    import Toast from '$lib/components/common/Toast.svelte';

    export let data;
    const { id } = data;

    let produit;
    let loading = false;
    let error = '';

    onMount(async () => {
        try {
            const response = await api.produits.getOne(id);
            produit = response;
        } catch (e) {
            error = "Erreur lors du chargement du produit";
        }
    });

    async function handleSubmit(event) {
        loading = true;
        error = '';

        try {
            await produits.updateProduit(id, event.detail);
            goto('/produits');
        } catch (e) {
            error = e.message || 'Erreur lors de la modification du produit';
            loading = false;
        }
    }
</script>

<div class="space-y-6">
    <h1 class="text-2xl">Modifier le Produit</h1>

    {#if produit}
        <div class="card">
            <ProduitForm
                {produit}
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