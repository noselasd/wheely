<script lang="ts">
	// @ts-ignore , we don't have type definitions for spin-wheel
	import { Wheel } from 'spin-wheel';
	import ex0 from '$lib/images/example-0-image.svg';
	import ex0_o from '$lib/images/example-2-overlay.svg';
	export interface Item {
		label: string;
	}
	let {
		items
	}: {
		items: Item[];
	} = $props();

	let wheelElement: HTMLElement;
	let currentWheel: Wheel = $state();

	function getImage(name: string): HTMLImageElement {
		let img = new Image();
		img.src = name;
		return img;
	}

	let wheelProps = {
		items: [],
		name: 'Takeaway',
		radius: 0.87,
		pointerAngle: 90,
		itemLabelRadius: 0.92,
		itemLabelRadiusMax: 0.37,
		itemLabelRotation: 0,
		itemLabelAlign: 'right',
		itemLabelColors: ['#000'],
		itemLabelBaselineOffset: -0.06,
		itemLabelFont: 'Rubik',
		itemBackgroundColors: ['#fbf8c4', '#e4f1aa', '#c0d26e', '#ff7d7d'],
		rotationSpeedMax: 700,
		rotationResistance: -90,
		lineWidth: 0.0,
		overlayImage: getImage(ex0_o),
		//	image: ex0,
		borderWidth: 0
	};

	function spinWheel() {
		console.log('spin', currentWheel);
		currentWheel.spin(360 * (Math.random() * 5 + 5));
	}
	$effect(() => {
		console.log('Items update');
		if (currentWheel) {
			console.log('Items update set');
			currentWheel.items = items;
		}
	});
	$effect(() => {
		const wheel = new Wheel(wheelElement, wheelProps);
		console.log('Wheel creation', wheelElement);
		wheel.onCurrentIndexChange = (ev: Event) => {
			console.log('onCurrentIndexChange', ev);
		};
		currentWheel = wheel;
		return () => {
			console.log('Wheel removal');
			wheel.remove();
		};
	});
</script>

<div class="container">
	<div>
		<div class="gui-wrapper">
			<p>Click-drag (or touch-flick) to spin the wheel.</p>
			<div>
				<button onclick={spinWheel}>Spin</button>
			</div>
		</div>
	</div>
	<div class="wheel" bind:this={wheelElement}></div>
</div>

<style>
	* {
		font-family: 'Lucida Grande', sans-serif;
		font-size: 15px;
		user-select: none; /* Prevent selecting ui text when dragging */
	}
	.wheel {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	.gui-wrapper {
		padding: 10px;
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 10px;
		background-color: blue;
	}

	.gui-wrapper > div {
		display: flex;
		flex-direction: row;
		gap: 10px;
		align-items: center;
	}

	button {
		padding: 10px 20px;
		cursor: pointer;
		margin-right: 10px;
		max-width: 100px;
	}
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
