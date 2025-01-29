<script>
    import { auth } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    
    let loading = true;
    
    onMount(async () => {
        await auth.checkAuth();
        loading = false;
    });
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl mb-8">Tableau de bord</h1>
    
    {#if loading}
        <div class="text-center">
            <p>Chargement...</p>
        </div>
    {:else if $auth.user}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="card">
                <h2 class="text-xl mb-4">Mes Produits</h2>
                <a href="/produits" class="btn-primary inline-block">
                    Gérer mes produits
                </a>
            </div>
            
            <div class="card">
                <h2 class="text-xl mb-4">Mes Repas</h2>
                <a href="/repas" class="btn-primary inline-block">
                    Gérer mes repas
                </a>
            </div>
            
            <div class="card">
                <h2 class="text-xl mb-4">Stocks Bas</h2>
                <a href="/stocks-bas" class="btn-primary inline-block">
                    Voir les stocks bas
                </a>
            </div>
        </div>
    {/if}
</div> 