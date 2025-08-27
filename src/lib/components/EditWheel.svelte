<script lang="ts">
	let { quick, entries, winners } = $props();
	let tabs = [
		{ name: 'Entries', comp: entries },
		{ name: 'Quick', comp: quick },
		{ name: 'Winners', comp: winners }
	];

	let cur = $state(tabs[1]);
</script>

<div class="tabs">
	{#each tabs as tab}
		<button class:selected={cur.name === tab.name} onclick={() => (cur = tab)}>
			{tab.name}
		</button>
	{/each}
</div>
<main>
	{@render cur.comp()}
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
	main {
		border: 1px solid var(--app-body-background);
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
