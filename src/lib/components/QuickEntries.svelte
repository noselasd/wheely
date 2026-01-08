<script lang="ts">
    import { data, setItems, type Item } from '$lib/WheelData.svelte';
    import Checkbox from '$lib/components/Checkbox.svelte';
    let { clearWinners = $bindable(false) } = $props();
    let text = {
        get value() {
            let s = data.items.map((e: Item) => e.label).join('\n');
            console.log('S is ', s);
            return s;
        },
        set value(val: string) {
            let e = val.split('\n');
            let items: Item[] = e.map((e, idx) => {
                return { label: e, value: { id: idx, enabled: true } };
            });
            setItems(items);
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
    <Checkbox title="Remove winners from wheel (Can't win twice)" bind:checked={clearWinners} />
    Remove winners
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
    .tools {
        margin: 0.3em;
        display: flex;
        gap: 0.3em;
        flex-direction: row;
    }
</style>
