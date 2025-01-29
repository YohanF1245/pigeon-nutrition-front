<script>
    import { auth } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import Toast from '$lib/components/common/Toast.svelte';

    let email = '';
    let password = '';
    let confirmPassword = '';
    let nom = '';
    let prenom = '';
    let loading = false;
    let error = '';

    async function handleSubmit() {
        loading = true;
        error = '';

        if (password !== confirmPassword) {
            error = 'Les mots de passe ne correspondent pas';
            loading = false;
            return;
        }

        try {
            const result = await auth.register({
                email,
                password,
                nom,
                prenom
            });
            
            if (result.success) {
                goto('/auth/login?registered=true');
            } else {
                error = result.error;
            }
        } catch (e) {
            error = e.message || 'Une erreur est survenue lors de l\'inscription';
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
                Inscription
            </h2>
        </div>

        <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="prenom" class="label">Prénom</label>
                        <input
                            id="prenom"
                            type="text"
                            required
                            class="input"
                            bind:value={prenom}
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label for="nom" class="label">Nom</label>
                        <input
                            id="nom"
                            type="text"
                            required
                            class="input"
                            bind:value={nom}
                            disabled={loading}
                        />
                    </div>
                </div>

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

                <div>
                    <label for="confirmPassword" class="label">Confirmer le mot de passe</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        required
                        class="input"
                        bind:value={confirmPassword}
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
                            Inscription en cours...
                        </span>
                    {:else}
                        S'inscrire
                    {/if}
                </button>
            </div>

            <div class="text-center">
                <a href="/auth/login" class="text-sm text-brandeis-blue hover:underline">
                    Déjà un compte ? Se connecter
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