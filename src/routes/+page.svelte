<script lang="ts">
	import Wheel from '$lib/components/Wheel.svelte';
	import type { Item } from '$lib/components/Wheel.svelte';
	let items: Item[] = [
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
	];
	let text = {
		get value() {
			let s = items.map((e) => e.label).join('\n');
			console.log('S is ', s);
			return s;
		},
		set value(val: string) {
			let e = val.split('\n').filter((s) => s.trim().length > 0);
			items = e.map((e) => {
				return { label: e.trim() };
			});
		}
	};
</script>

<div class="container">
	<div class="left">
		<Wheel {items} />
	</div>
	<div class="right">
		<textarea
			rows="5"
			bind:value={text.value}
			autocomplete="off"
			spellcheck="false"
			maxlength="1024"
		>
		</textarea>
	</div>
</div>

<style>
	.container {
		display: flex;
		height: 100%; /* full screen height */
	}

	.left {
		flex: 8.5; /* 85% width */
		background: lightblue;
	}

	.right {
		flex: 1.5; /* 15% width */
		background: lightcoral;
	}
</style>
