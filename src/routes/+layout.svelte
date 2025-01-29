<script>
    import '../app.css';
    import Navbar from '$lib/components/layout/Navbar.svelte';
</script>

<Navbar />

<main class="min-h-screen bg-gray-50">
    <slot />
</main>

<style>
    :global(body) {
        @apply font-inter text-onyx;
    }
</style> 