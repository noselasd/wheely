<script lang="ts">
    import { scale } from 'svelte/transition';
    let { showModal = $bindable(), winner = $bindable() } = $props();
    let dialog: HTMLDialogElement; // HTMLDialogElement
    $effect(() => {
        if (showModal) dialog.showModal();
    });
</script>

{#if showModal}
    <dialog
        class="shadowbox"
        bind:this={dialog}
        onclose={() => (showModal = false)}
        transition:scale={{ duration: 350, start: 0.1, opacity: 0.5 }}>
        <div class="wrapper">
            <main>
                <center><h1>{winner}</h1></center>
            </main>
            <center><h2>🎊 Won ! 🎊</h2> </center>

            <div class="buttons">
                <button class="cool-button button" onclick={() => dialog.close()}>Close</button>
            </div>
        </div>
    </dialog>
{/if}

<style lang="scss">
    h1 {
        font-size: 3em;
    }
    h2 {
        font-size: 1em;
        color: var(--app-disabled-text-color);
    }
    main {
        margin-bottom: 1em;
    }
    .buttons {
        display: flex;
    }
    .button {
        color: var(--app-content-text-color);

        background-color: var(--app-widget-button-color);
        margin-left: auto;
    }
    .wrapper {
        color: var(--app-content-text-color);
        margin: 0.7em;
    }

    .shadowbox {
        width: 33%;
        background: var(--app-content-background);
        box-shadow: 0px 0px 10px 5px rgba(183, 179, 179, 1);
        -webkit-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 1);
        -moz-box-shadow: 10pxpx 0px 10px 5px rgba(0, 0, 0, 1);
    }
</style>
