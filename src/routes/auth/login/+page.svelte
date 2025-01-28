<script>
    import { auth } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import Toast from '$lib/components/common/Toast.svelte';

    let email = '';
    let password = '';
    let loading = false;
    let error = '';

    async function handleSubmit() {
        loading = true;
        error = '';

        try {
            const success = await auth.login({ email, password });
            if (success) {
                goto('/dashboard');
            } else {
                error = 'Identifiants incorrects';
            }
        } catch (e) {
            error = e.message || 'Une erreur est survenue';
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div class="text-center">
            <h1 class="text-3xl font-audiowide text-brandeis-blue">
                FoodManager
            </h1>
            <h2 class="mt-6 text-2xl font-bold text-onyx">
                Connexion
            </h2>
        </div>

        <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
            <div class="space-y-4">
                <div>
                    <label for="email" class="label">Adresse email</label>
                    <input
                        id="email"
                        type="email"
                        required
                        class="input"
                        bind:value={email}
                        disabled={loading}
                    />
                </div>

                <div>
                    <label for="password" class="label">Mot de passe</label>
                    <input
                        id="password"
                        type="password"
                        required
                        class="input"
                        bind:value={password}
                        disabled={loading}
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    class="btn-primary w-full flex justify-center"
                    disabled={loading}
                >
                    {#if loading}
                        <span class="inline-flex items-center">
                            Connexion en cours...
                        </span>
                    {:else}
                        Se connecter
                    {/if}
                </button>
            </div>

            <div class="text-center">
                <a href="/auth/register" class="text-sm text-brandeis-blue hover:underline">
                    Pas encore de compte ? S'inscrire
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