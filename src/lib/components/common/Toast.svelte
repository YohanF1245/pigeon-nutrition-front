<script>
    import { fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    export let type = 'info'; // 'success', 'error', 'info'
    export let message = '';
    export let duration = 3000;

    const dispatch = createEventDispatcher();

    let timeoutId;

    $: if (message) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            dispatch('dismiss');
        }, duration);
    }
</script>

{#if message}
    <div
        transition:fade
        class="fixed top-4 right-4 z-50 max-w-sm"
        role="alert"
    >
        <div class="card {type === 'error' ? 'bg-rose-taupe text-white' : type === 'success' ? 'bg-green-500 text-white' : 'bg-columbia-blue text-onyx'}">
            <div class="flex items-center justify-between">
                <p class="text-sm">{message}</p>
                <button
                    class="ml-4 text-sm font-medium opacity-75 hover:opacity-100"
                    on:click={() => dispatch('dismiss')}
                >
                    ×
                </button>
            </div>
        </div>
    </div>
{/if} 