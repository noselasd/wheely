<script lang="ts">
	import Wheel from '$lib/components/Wheel.svelte';
	import EditWheel from '$lib/components/EditWheel.svelte';
	import { data, setItems, type Item } from '$lib/WheelData.svelte';
	setItems([
		{
			label: 'one'
		},
		{
			label: 'two'
		},
		{
			label: 'three'
		},
		{
			label: 'Four'
		}
	]);
	data.name = 'Spin the Wheel';
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

<div class="container">
	<div class="left">
		<div class="title">
			{data.name}
		</div>
		<div class="wheelbox shadowbox">
			<Wheel items={data.items} />
		</div>
	</div>
	<div class="right shadowbox">
		<div class="right">
			<EditWheel>
				{#snippet quick()}
					<div class="desc">Type or paste entries below</div>
					<textarea
						rows="10"
						bind:value={text.value}
						autocomplete="off"
						spellcheck="false"
						maxlength="1024"
					>
					</textarea>
				{/snippet}
				{#snippet entries()}
					<h1>placeholder</h1>
				{/snippet}
				{#snippet winners()}
					<h1>placeholder</h1>
				{/snippet}
			</EditWheel>
		</div>
	</div>
</div>

<style lang="scss">
	.desc {
		margin: 1em;
		color: var(--app-table-header-text-color);
	}
	.container {
		display: flex;
		height: 100%;
		flex-direction: row;
	}
	.left {
		align-items: center;
		display: flex;
		flex-direction: column;
		flex: 8;
	}
	.title {
		margin: auto;
		flex: 0.5;
		padding: 0.3em;
		font-size: 3em;
		text-shadow:
			0 0 0.3em #d3d3d3,
			0 0 0.4em #d3d3d3,
			0 0 0.6em #d3d3d3,
			0 0 1em #2d6072,
			0 0 1.2em #2d6072,
			0 0 1.5em #2d6072;
	}
	.wheelbox {
		flex: 9.5;
		width: 95%;
		height: 95%;
		margin-bottom: 1em;
	}
	.shadowbox {
		background: var(--app-content-background);
		box-shadow: 1px 1px 10px 5px rgba(183, 179, 179, 0.58);
		-webkit-box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.58);
		-moz-box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.58);
	}
	.right {
		flex: 2; /* 15% width */
		display: flex;
		flex-direction: column;
		margin: 1em;
		height: 98%;
	}

	$margin: 0em;
	textarea {
		padding: 0.5em;
		margin: $margin;
		width: calc(100% - 2 * $margin);
		height: calc(100% - 2 * $margin);
		font-size: 16px;
		box-sizing: border-box;
		border: 0;
		background: var(--app-content-background);
		color: var(--app-text-color);
		resize: none;
		&:focus {
			//outline: none !important;
			outline: solid var(--app-input-border-color);
		}
	}
</style>
