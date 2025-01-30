<script>
    import '../app.css';
    import { onMount } from 'svelte';
    import { auth } from '$lib/stores/auth';
    import Navbar from '$lib/components/layout/Navbar.svelte';

    onMount(async () => {
        await auth.checkAuth();
    });
</script>

<Navbar />

<main class="min-h-screen bg-gray-50 pt-16">
    <slot />
</main>

<style>
    :global(body) {
        @apply font-inter text-onyx;
    }
</style> 