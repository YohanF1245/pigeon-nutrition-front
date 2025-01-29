<script>
    import { onMount } from 'svelte';
    import { produits } from '$lib/stores/produits';
    import ProduitCard from '$lib/components/produits/ProduitCard.svelte';
    import Toast from '$lib/components/common/Toast.svelte';

    let searchQuery = '';
    let error = '';
    let success = '';

    onMount(() => {
        loadProduits();
    });

    async function loadProduits() {
        try {
            await produits.loadProduits();
        } catch (e) {
            error = "Erreur lors du chargement des produits";
        }
    }

    async function handleDelete(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            try {
                await produits.deleteProduit(id);
                success = 'Produit supprimé avec succès';
            } catch (e) {
                error = "Erreur lors de la suppression du produit";
            }
        }
    }

    $: filteredProduits = $produits.items.filter(produit => 
        produit.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        produit.code_barre?.toLowerCase().includes(searchQuery.toLowerCase())
    );
</script>

<div class="space-y-6">
    <div class="flex justify-between items-center">
        <h1 class="text-2xl">Mes Produits</h1>
        <a href="/produits/nouveau" class="btn-primary">
            Ajouter un produit
        </a>
    </div>

    <div class="card">
        <input
            type="text"
            placeholder="Rechercher un produit..."
            class="input"
            bind:value={searchQuery}
        />
    </div>

    {#if $produits.loading}
        <div class="text-center py-8">
            <p>Chargement...</p>
        </div>
    {:else if filteredProduits.length === 0}
        <div class="card text-center py-8">
            <p class="text-gray-500">Aucun produit trouvé</p>
        </div>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each filteredProduits as produit (produit.id)}
                <ProduitCard
                    {produit}
                    on:edit={() => goto(`/produits/${produit.id}`)}
                    on:delete={() => handleDelete(produit.id)}
                    on:updateStock={() => goto(`/produits/${produit.id}/stock`)}
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