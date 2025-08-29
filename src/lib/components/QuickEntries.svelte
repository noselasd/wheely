<script lang="ts">
	import { data, setItems, type Item } from '$lib/WheelData.svelte';

	let text = {
		get value() {
			let s = data.items.map((e: Item) => e.label).join('\n');
			console.log('S is ', s);
			return s;
		},
		set value(val: string) {
			let e = val.split('\n');
			let items = e.map((e) => {
				return { label: e };
			});
			setItems(items);
		}
	};
</script>

<div class="desc">Type or paste entries below</div>
<textarea
	rows="10"
	bind:value={text.value}
	autocomplete="off"
	spellcheck="false"
	maxlength="2048"
	wrap={'off' as any}
>
</textarea>

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
</style>
