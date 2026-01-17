<script lang="ts">
    import * as WD from '$lib/WheelData.svelte';

    import Checkbox from '$lib/components/Checkbox.svelte';
    let text = {
        get value() {
            let s = WD.data.items.map((e: WD.Item) => e.label).join('\n');
            console.log('S is ', s);
            return s;
        },
        set value(val: string) {
            let e = val.split('\n');
            let items: WD.Item[] = e.map((e, idx) => {
                return { label: e, value: { id: idx + 1, enabled: true } };
            });
            WD.setItems(items);
        },
    };
</script>

<div class="desc">Type or paste entries below</div>
<textarea
    rows="10"
    bind:value={text.value}
    autocomplete="off"
    spellcheck="false"
    maxlength="2048"
    wrap={'off' as any}>
</textarea>
<div class="tools">
    <Checkbox
        title="Remove winners from wheel (Can't win twice)"
        bind:checked={WD.data.settings.clearWinnersAfterSpin} />
    Remove winners
    {#if WD.data.settings.clearWinnersAfterSpin}
        <button title="Reset wheel" class="cool-button button" onclick={WD.initialize}
            >Reset</button>
    {/if}
</div>

<style lang="scss">
    .desc {
        margin: 1em;
        color: var(--app-table-header-text-color);
    }

    $margin: 0em;

    textarea {
        padding: 0.5em;
        margin: $margin;
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
    .button {
        color: var(--app-content-text-color);
        background-color: var(--app-widget-button-color);
        margin-left: auto;
    }
    .tools {
        margin: 0.3em;
        display: flex;
        align-items: flex-end;
        gap: 0.3em;
        flex-direction: row;
    }
</style>
