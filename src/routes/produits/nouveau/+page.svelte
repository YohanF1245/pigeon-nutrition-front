<script>
    import { goto } from '$app/navigation';
    import { produits } from '$lib/stores/produits';
    import ProduitForm from '$lib/components/produits/ProduitForm.svelte';
    import Toast from '$lib/components/common/Toast.svelte';

    let loading = false;
    let error = '';

    async function handleSubmit(event) {
        loading = true;
        error = '';

        try {
            await produits.addProduit(event.detail);
            goto('/produits');
        } catch (e) {
            error = e.message || 'Erreur lors de la création du produit';
            loading = false;
        }
    }
</script>

<div class="space-y-6">
    <h1 class="text-2xl">Nouveau Produit</h1>

    <div class="card">
        <ProduitForm
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