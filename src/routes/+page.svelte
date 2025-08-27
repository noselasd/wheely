<script lang="ts">
	import Wheel from '$lib/components/Wheel.svelte';
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
	data.name = 'Wheel of Numbers';
	let text = {
		get value() {
			let s = data.items.map((e: Item) => e.label).join('\n');
			console.log('S is ', s);
			return s;
		},
		set value(val: string) {
			let e = val.split('\n').filter((s) => s.trim().length > 0);
			let items = e.map((e) => {
				return { label: e.trim() };
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
		<div class="title">Entries</div>
		<textarea
			rows="5"
			bind:value={text.value}
			autocomplete="off"
			spellcheck="false"
			maxlength="2048"
		>
		</textarea>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		height: 100%;
		flex-direction: row;
	}
	.left {
		align-items: center;
		display: flex;
		flex-direction: column;
		flex: 8.5;
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
		flex: 1.5; /* 15% width */
		display: flex;
		margin: 1em;
		flex-direction: column;
	}

	$margin: 0.3em;
	textarea {
		padding: 0.5em;
		margin: $margin;
		width: calc(100% - 2 * $margin);
		height: calc(100% - 2 * $margin);
		font-size: 16px;
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
