<script lang="ts">
	import { data, clearWinners } from '$lib/WheelData.svelte';
	function onClear() {
		clearWinners();
	}
</script>

<div class="desc">
	{#if data.winners.length > 0}
		Winners (most recent first)
	{:else}
		(No games played yet)
	{/if}
</div>
<textarea rows="10" autocomplete="off" spellcheck="false" readonly wrap={'off' as any}
	>{data.winners.reverse().join('\n')}</textarea
>
<div class="tools">
	<button
		title="Clear winning entries"
		class=""
		onclick={onClear}
		disabled={data.winners.length == 0}>Clear</button
	>
</div>

<style lang="scss">
	.desc {
		margin: 1em;
		color: var(--app-table-header-text-color);
	}
	.tools {
		margin: 0.3em;
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
