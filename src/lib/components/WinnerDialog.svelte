<script lang="ts">
	import { data } from '$lib/WheelData.svelte';
	let { showModal = $bindable() } = $props();
	let dialog: HTMLDialogElement; // HTMLDialogElement
	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>

<dialog class="shadowbox" bind:this={dialog} onclose={() => (showModal = false)}>
	<div class="wrapper">
		<main>
			<center><h1>{data.winners.at(-1)}</h1></center>
		</main>
		<center><h2>selected</h2> </center>

		<div class="buttons">
			<button class="cool-button button" autofocus onclick={() => dialog.close()}>Close</button>
		</div>
	</div>
</dialog>

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
		margin-left: auto;
	}
	.wrapper {
		color: var(--app-content-text-color);
		margin: 0.7em;
	}
	header {
		border-bottom: solid;
		padding-bottom: 1em;
	}
	.shadowbox {
		width: 33%;
		background: var(--app-content-background);
		box-shadow: 0px 0px 10px 5px rgba(183, 179, 179, 1);
		-webkit-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 1);
		-moz-box-shadow: 10pxpx 0px 10px 5px rgba(0, 0, 0, 1);
	}
</style>
