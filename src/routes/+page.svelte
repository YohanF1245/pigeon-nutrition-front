<script>
    import { auth } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    onMount(() => {
        if ($auth.isAuthenticated) {
            goto('/dashboard');
        } else {
            goto('/auth/login');
        }
    });
</script>

<div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
        <h1 class="text-3xl font-audiowide text-brandeis-blue mb-4">
            FoodManager
        </h1>
        <p class="text-gray-600">
            Chargement...
        </p>
    </div>
</div> 