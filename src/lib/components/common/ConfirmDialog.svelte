<script>
    import { createEventDispatcher } from 'svelte';
    
    export let show = false;
    export let title = 'Confirmation';
    export let message = 'Êtes-vous sûr ?';
    
    const dispatch = createEventDispatcher();
    
    function confirm() {
        dispatch('confirm');
        show = false;
    }
    
    function cancel() {
        dispatch('cancel');
        show = false;
    }
</script>

{#if show}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 class="text-lg font-medium mb-4">{title}</h3>
            <p class="text-gray-600 mb-6">{message}</p>
            
            <div class="flex justify-end space-x-4">
                <button 
                    class="btn-secondary"
                    on:click={cancel}
                >
                    Annuler
                </button>
                <button 
                    class="btn-danger"
                    on:click={confirm}
                >
                    Confirmer
                </button>
            </div>
        </div>
    </div>
{/if} 