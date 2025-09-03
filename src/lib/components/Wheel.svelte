<script lang="ts">
	// @ts-ignore , we don't have type definitions for spin-wheel
	import { Wheel } from 'spin-wheel';
	import { type Item } from '$lib/WheelData.svelte';
	import ex0 from '$lib/images/example-0-image.svg';
	import ex0_o from '$lib/images/example-2-overlay.svg';
	type OnWinCallback = (winningEntry: string) => void;
	let {
		items,
		onWin
	}: {
		items: Item[];
		onWin?: OnWinCallback;
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
		pointerAngle: 0,
		itemLabelRadius: 0.92,
		itemLabelRadiusMax: 0.37,
		itemLabelRotation: 0,
		itemLabelAlign: 'right',
		itemLabelColors: ['#000'],
		itemLabelBaselineOffset: -0.06,
		itemLabelFont: 'Rubik',
		itemBackgroundColors: ['#fbf8c4', '#e4f1aa', '#c0d26e'],
		rotationSpeedMax: 400,
		rotationResistance: -40,
		lineWidth: 0.0,
		overlayImage: getImage(ex0_o),
		//	image: ex0,
		borderWidth: 0
	};

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
		wheel.onRest = onRest;
		wheel.onCurrentIndexChange = (ev: Event) => {
			console.log('onCurrentIndexChange', ev);
		};
		currentWheel = wheel;
		return () => {
			console.log('Wheel removal');
			wheel.remove();
		};
	});

	function onRest(data: any) {
		const winningItem: string = currentWheel?.items[data.currentIndex].label;
		if (winningItem) {
			onWin?.(winningItem);
		}
	}
</script>

<div class="container">
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

	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
