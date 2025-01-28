<script>
    import { page } from '$app/stores';
    import { auth } from '$lib/stores/auth';

    $: user = $auth.user;
</script>

<aside class="hidden md:flex md:flex-col w-64 bg-white shadow-lg">
    <div class="flex flex-col flex-1">
        <!-- Profil utilisateur -->
        <div class="px-4 py-6 border-b border-gray-200">
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                    <div class="w-10 h-10 rounded-full bg-brandeis-blue flex items-center justify-center">
                        <span class="text-white font-medium">
                            {user?.prenom?.[0]}{user?.nom?.[0]}
                        </span>
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-onyx truncate">
                        {user?.prenom} {user?.nom}
                    </p>
                    <p class="text-sm text-gray-500 truncate">
                        {user?.email}
                    </p>
                </div>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-2 py-4 space-y-1">
            <a 
                href="/dashboard" 
                class="flex items-center px-4 py-2 text-sm font-medium rounded-md {$page.url.pathname === '/dashboard' ? 'bg-lavender-web text-brandeis-blue' : 'text-onyx hover:bg-gray-50'}"
            >
                <!-- Icône Dashboard -->
                <span>Dashboard</span>
            </a>

            <a 
                href="/produits" 
                class="flex items-center px-4 py-2 text-sm font-medium rounded-md {$page.url.pathname.startsWith('/produits') ? 'bg-lavender-web text-brandeis-blue' : 'text-onyx hover:bg-gray-50'}"
            >
                <!-- Icône Produits -->
                <span>Produits</span>
            </a>

            <a 
                href="/repas" 
                class="flex items-center px-4 py-2 text-sm font-medium rounded-md {$page.url.pathname.startsWith('/repas') ? 'bg-lavender-web text-brandeis-blue' : 'text-onyx hover:bg-gray-50'}"
            >
                <!-- Icône Repas -->
                <span>Repas</span>
            </a>

            <a 
                href="/stocks-bas" 
                class="flex items-center px-4 py-2 text-sm font-medium rounded-md {$page.url.pathname === '/stocks-bas' ? 'bg-lavender-web text-brandeis-blue' : 'text-onyx hover:bg-gray-50'}"
            >
                <!-- Icône Stocks bas -->
                <span>Stocks bas</span>
            </a>
        </nav>
    </div>
</aside> 