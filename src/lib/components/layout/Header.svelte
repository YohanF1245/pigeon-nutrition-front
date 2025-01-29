<script>
    import { auth } from '$lib/stores/auth';
    import { page } from '$app/stores';
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
                            class="px-3 py-2 rounded-md text-sm font-medium {$page.url.pathname === '/produits' ? 'text-brandeis-blue bg-lavender-web' : 'text-onyx hover:text-brandeis-blue'}"
                        >
                            Produits
                        </a>
                        <a 
                            href="/repas" 
                            class="px-3 py-2 rounded-md text-sm font-medium {$page.url.pathname === '/repas' ? 'text-brandeis-blue bg-lavender-web' : 'text-onyx hover:text-brandeis-blue'}"
                        >
                            Repas
                        </a>
                    </div>

                    <div class="ml-4 flex items-center">
                        <button 
                            on:click={() => auth.logout()}
                            class="ml-4 px-4 py-2 text-sm font-medium text-white bg-rose-taupe rounded-md hover:bg-opacity-90"
                        >
                            Déconnexion
                        </button>
                    </div>
                {:else}
                    <a 
                        href="/auth/login" 
                        class="px-4 py-2 text-sm font-medium text-white bg-brandeis-blue rounded-md hover:bg-opacity-90"
                    >
                        Connexion
                    </a>
                {/if}
            </div>
        </div>
    </div>
</header> 