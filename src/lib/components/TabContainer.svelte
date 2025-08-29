<script lang="ts">
	import type { Snippet } from 'svelte';

	// type Props = {
	// 	// Classic props :
	// 	activeIndex: number;
	// } & {
	// 	// restProps : anything of type Snippet
	// 	[key: string]: Snippet;
	// };
	let { activeIndex = $bindable(0), ...restProps } = $props();

	const tabs = $derived(Object.entries(restProps).map(([k, v]) => ({ name: k, snippet: v })));
	let active = $derived(tabs[activeIndex]);
</script>

<div class="tabs">
	{#each tabs as tab}
		<button class:selected={active.name === tab.name} onclick={() => (active = tab)}>
			{tab.name}
		</button>
	{/each}
</div>
<main>
	{@render active.snippet()}
</main>

<style lang="scss">
	.tabs {
		display: flex;
	}
	button {
		cursor: pointer;
		padding: 0.5rem 1rem;
		border: 1px solid transparent;
		background-color: transparent;
		border-bottom-color: var(--app-content-background);
		color: var(--app-text-color);
		margin-bottom: -1px;
	}
	button.selected {
		border-top-right-radius: 8px;
		border-top-left-radius: 8px;
		border-top-width: 5px;
		background-color: var(--app-widget-button-color);
		border-color: var(--app-widget-button-color-darker) var(--app-body-background)
			var(--app-content-background);
	}
	button:hover {
		background-color: var(--app-widget-button-color-darker);
	}
	main {
		border: 1px solid var(--app-body-background);
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
