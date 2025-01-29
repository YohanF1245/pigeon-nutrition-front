<script>
    import { auth } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    async function handleLogout() {
        auth.logout();
        goto('/auth/login');
    }
</script>

<header class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <span class="font-audiowide text-brandeis-blue text-xl">FoodManager</span>
                </div>
            </div>

            <div class="flex items-center">
                {#if $auth.isAuthenticated}
                    <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                        <a 
                            href="/dashboard" 
                            class="px-3 py-2 rounded-md text-sm font-medium {$page.url.pathname === '/dashboard' ? 'text-brandeis-blue bg-lavender-web' : 'text-onyx hover:text-brandeis-blue'}"
                        >
                            Dashboard
                        </a>
                        <a 
                            href="/produits" 
                            class="px-3 py-2 rounded-md text-sm font-medium {$page.url.pathname.startsWith('/produits') ? 'text-brandeis-blue bg-lavender-web' : 'text-onyx hover:text-brandeis-blue'}"
                        >
                            Produits
                        </a>
                        <a 
                            href="/repas" 
                            class="px-3 py-2 rounded-md text-sm font-medium {$page.url.pathname.startsWith('/repas') ? 'text-brandeis-blue bg-lavender-web' : 'text-onyx hover:text-brandeis-blue'}"
                        >
                            Repas
                        </a>
                        <button 
                            on:click={handleLogout}
                            class="btn-danger"
                        >
                            Déconnexion
                        </button>
                    </div>
                {:else}
                    <div class="flex space-x-4">
                        <a 
                            href="/auth/login" 
                            class="btn-primary"
                        >
                            Connexion
                        </a>
                        <a 
                            href="/auth/register" 
                            class="btn-secondary"
                        >
                            Inscription
                        </a>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</header> 