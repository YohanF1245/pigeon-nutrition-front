<script>
    import api from '$lib/services/api';
    import { onMount } from 'svelte';

    let data = [];

    onMount(async () => {
        try {
            const response = await api.get('/api/produits');
            data = response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    });
</script>

<h1>Bienvenue sur FoodManager</h1>
{#if data.length > 0}
    <ul>
        {#each data as item}
            <li>{item.nom}</li>
        {/each}
    </ul>
{:else}
    <p>Chargement des données...</p>
{/if} 