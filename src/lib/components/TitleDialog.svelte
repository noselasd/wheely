<script lang="ts">
    let { showModal = $bindable<boolean>(), title = $bindable<string>() } = $props();
    let dialog: HTMLDialogElement | undefined = $state(undefined); // HTMLDialogElement
    $effect(() => {
        if (showModal && dialog) dialog.showModal();
    });
</script>

<dialog class="shadowbox" bind:this={dialog} onclose={() => (showModal = false)}>
    <div class="wrapper">
        <main>
            <center><h1>Edit Title</h1></center>
            <input autocomplete="off" spellcheck="false" type="text" bind:value={title} />
        </main>
        <div class="buttons">
            <button
                class="cool-button button"
                onclick={() => {
                    if (dialog) dialog.close();
                }}>Close</button>
        </div>
    </div>
</dialog>

<style lang="scss">
    h1 {
        font-size: 2em;
        color: var(--app-content-text-color);
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
        margin: 0.7em;
    }
    $margin: 0em;

    input {
        padding: 0.5em;
        margin: $margin;
        margin-top: 0.7em;
        width: calc(100% - 2 * $margin);
        font-size: 16px;
        box-sizing: border-box;
        border: 0;
        background: var(--app-content-background);
        color: var(--app-text-color);
        resize: none;
        /* flex instead of fixed height so it can shrink */
        flex: 1 1 auto;
        min-height: 0;
        height: auto;

        &:focus {
            outline: solid var(--app-input-border-color);
        }
    }
    .shadowbox {
        width: 33%;
        background: var(--app-content-background);
        box-shadow: 0px 0px 10px 5px rgba(183, 179, 179, 1);
        -webkit-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 1);
        -moz-box-shadow: 10pxpx 0px 10px 5px rgba(0, 0, 0, 1);
    }
</style>
