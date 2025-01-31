<script>
    import { auth } from '$lib/stores/auth';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    
    let isMenuOpen = false;
    
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }
    
    async function handleLogout() {
        try {
            auth.logout();
            await goto('/auth/login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    }

    // Fermer le menu quand on change de page
    $: if ($page) {
        isMenuOpen = false;
    }
</script>

<nav class="bg-white shadow-lg fixed w-full top-0 z-50">
    <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
            <!-- Logo et titre -->
            <div class="flex items-center">
                <span class="font-audiowide text-brandeis-blue text-xl">FoodManager</span>
            </div>

            <!-- Bouton menu mobile -->
            <div class="flex items-center md:hidden">
                <button 
                    on:click={toggleMenu}
                    class="text-gray-500 hover:text-brandeis-blue focus:outline-none"
                >
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {#if isMenuOpen}
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        {:else}
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        {/if}
                    </svg>
                </button>
            </div>

            <!-- Menu desktop -->
            <div class="hidden md:flex items-center space-x-4">
                {#if $auth.isAuthenticated}
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
                {:else}
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
                {/if}
            </div>
        </div>

        <!-- Menu mobile -->
        {#if isMenuOpen}
            <div class="md:hidden py-2">
                {#if $auth.isAuthenticated}
                    <a 
                        href="/dashboard" 
                        class="block px-3 py-2 rounded-md text-base font-medium {$page.url.pathname === '/dashboard' ? 'text-brandeis-blue bg-lavender-web' : 'text-onyx hover:text-brandeis-blue'}"
                    >
                        Dashboard
                    </a>
                    <a 
                        href="/produits" 
                        class="block px-3 py-2 rounded-md text-base font-medium {$page.url.pathname.startsWith('/produits') ? 'text-brandeis-blue bg-lavender-web' : 'text-onyx hover:text-brandeis-blue'}"
                    >
                        Produits
                    </a>
                    <a 
                        href="/repas" 
                        class="block px-3 py-2 rounded-md text-base font-medium {$page.url.pathname.startsWith('/repas') ? 'text-brandeis-blue bg-lavender-web' : 'text-onyx hover:text-brandeis-blue'}"
                    >
                        Repas
                    </a>
                    <button 
                        on:click={handleLogout}
                        class="block w-full text-left px-3 py-2 text-base font-medium text-rose-taupe hover:bg-rose-taupe hover:bg-opacity-10"
                    >
                        Déconnexion
                    </button>
                {:else}
                    <a 
                        href="/auth/login" 
                        class="block px-3 py-2 text-base font-medium text-brandeis-blue hover:bg-lavender-web"
                    >
                        Connexion
                    </a>
                    <a 
                        href="/auth/register" 
                        class="block px-3 py-2 text-base font-medium text-columbia-blue hover:bg-lavender-web"
                    >
                        Inscription
                    </a>
                {/if}
            </div>
        {/if}
    </div>
</nav>

<!-- Spacer pour compenser la navbar fixed -->
<div class="h-16"></div> 