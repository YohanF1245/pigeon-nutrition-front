<script>
    import { onMount } from 'svelte';
    import { auth } from '$lib/stores/auth';
    import Header from '$lib/components/layout/Header.svelte';
    import Sidebar from '$lib/components/layout/Sidebar.svelte';
    import '../app.css';

    onMount(() => {
        auth.checkAuth();
    });
</script>

<div class="min-h-screen bg-gray-50">
    <Header />
    
    <div class="flex">
        {#if $auth.isAuthenticated}
            <Sidebar />
        {/if}
        
        <main class="flex-1 p-4">
            <slot />
        </main>
    </div>
</div>

<style>
    :global(body) {
        @apply font-inter text-onyx;
    }
</style> 