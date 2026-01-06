<script lang="ts">
    // @ts-ignore , we don't have type definitions for spin-wheel
    import { Wheel } from 'spin-wheel';
    import { type Item } from '$lib/WheelData.svelte';
    import ex0 from '$lib/images/example-0-image.svg';
    import ex0_o from '$lib/images/example-2-overlay.svg';
    type OnWinCallback = (winningEntry: string) => void;
    let {
        items,
        onWin,
    }: {
        items: Item[];
        onWin?: OnWinCallback;
    } = $props();

    let wheelElement: HTMLElement;
    let currentWheel: Wheel = $state();
    let background: HTMLImageElement;
    let imagLoaded = $state(false);
    const maxSpeed = 440;
    const resistance = -40;

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
        rotationSpeedMax: maxSpeed,
        rotationResistance: resistance,
        lineWidth: 0.0,
        borderWidth: 0,
    };

    function initWheel(): Wheel {
        //@ts-ignore
        wheelProps.overlayImage = background;
        const wheel = new Wheel(wheelElement, wheelProps);
        console.log('Wheel creation', wheelElement);
        wheel.onRest = onRest;
        wheel.onCurrentIndexChange = (ev: Event) => {
            console.log('onCurrentIndexChange', ev);
        };
        return wheel;
    }
    $effect(() => {
        if (background && background.complete) {
            imagLoaded = true;
        } else if (background) {
            background.onload = () => {
                imagLoaded = true;
            };
        }
    });

    $effect(() => {
        if (currentWheel) {
            console.log('Items update set');
            currentWheel.items = items;
        }
    });

    $effect(() => {
        if (imagLoaded) {
            let wheel = initWheel();
            currentWheel = wheel;
            return () => {
                console.log('Wheel removal');
                wheel.remove();
            };
        }
    });

    function onRest(data: any) {
        const winningItem: string = currentWheel?.items[data.currentIndex].label;
        if (winningItem) {
            onWin?.(winningItem);
        }
    }
    function spin() {
        if (!currentWheel) {
            return;
        }
        const speed = Math.random() * (maxSpeed - 340) + 340;
        const factor = 1 + (Math.random() * 0.4 - 0.2); // +/- 20%
        currentWheel.rotationResistance = resistance * factor;
        currentWheel.spin(speed);
    }
</script>

<div class="container">
    <img hidden alt="bg" src={ex0_o} bind:this={background} />
    <div class="wheel" bind:this={wheelElement}>
        <button class="spin" onclick={spin}>SPIN</button>
    </div>
</div>

<style lang="scss">
    * {
        font-family: 'Lucida Grande', sans-serif;
        font-size: 15px;
        user-select: none; /* Prevent selecting ui text when dragging */
    }
    .wheel {
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative; /* Still needed for positioning context */
    }

    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .spin {
        position: absolute;
        top: 50%;
        left: 50%;
        width: min(12vw, 12vh); /* Circle scales with both width and height */
        aspect-ratio: 1 / 1; /* Keeps it symmetrical */
        border-radius: 50%; /* Turns the square into a circle */
        background-color: rgba(0, 0, 0, 0);
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        font-size: 1.5rem;
        cursor: pointer; /* Detects clicks */
        transform: translate(-50%, -50%); /* Adjusts for the element's own size */
    }
    .spin:hover {
        background-color: rgba(219, 14, 14, 0.2);
        transition: all 0.1s ease; /* Smooth transition for the effect */
    }
    .spin:active {
        background-color: rgba(219, 14, 14, 0.5);
        box-shadow: 0 2px 0 #3e8e41; /* Smaller shadow */
        transition: all 0.2s ease; /* Smooth transition for the effect */
    }
</style>
