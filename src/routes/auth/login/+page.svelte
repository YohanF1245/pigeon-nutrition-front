<script>
    import { auth } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import Toast from '$lib/components/common/Toast.svelte';
    
    let email = '';
    let password = '';
    let error = '';
    let success = '';
    let loading = false;

    $: if ($page.url.searchParams.get('registered')) {
        success = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
    }

    async function handleSubmit() {
        loading = true;
        error = '';
        success = '';
        
        const result = await auth.login({ email, password });
        
        if (result.success) {
            goto('/dashboard');
        } else {
            error = result.error;
        }
        
        loading = false;
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Connexion
            </h2>
        </div>
        <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
            {#if error}
                <div class="rounded-md bg-red-50 p-4">
                    <div class="text-sm text-red-700">
                        {error}
                    </div>
                </div>
            {/if}
            
            <div class="rounded-md shadow-sm -space-y-px">
                <div>
                    <label for="email" class="sr-only">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        bind:value={email}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <label for="password" class="sr-only">Mot de passe</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        bind:value={password}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Mot de passe"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    class="btn-primary w-full"
                >
                    {#if loading}
                        <span class="inline-flex items-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Connexion en cours...
                        </span>
                    {:else}
                        Se connecter
                    {/if}
                </button>
            </div>

            <div class="text-center mt-4">
                <a href="/auth/register" class="text-brandeis-blue hover:underline">
                    Pas encore de compte ? Inscrivez-vous
                </a>
            </div>
        </form>
    </div>
</div>

<Toast
    type="error"
    message={error}
    on:dismiss={() => error = ''}
/>

<Toast
    type="success"
    message={success}
    on:dismiss={() => success = ''}
/> 