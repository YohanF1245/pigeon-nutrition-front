<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { produits } from '$lib/stores/produits';
    import StockAdjustment from '$lib/components/produits/StockAdjustment.svelte';
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

    async function handleAdjust(event) {
        loading = true;
        error = '';

        try {
            await produits.updateStock(id, event.detail);
            goto('/produits');
        } catch (e) {
            error = e.message || 'Erreur lors de la mise à jour du stock';
            loading = false;
        }
    }
</script>

<div class="space-y-6">
    <h1 class="text-2xl">Ajuster le Stock</h1>

    {#if produit}
        <div class="card">
            <StockAdjustment
                {produit}
                {loading}
                on:adjust={handleAdjust}
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