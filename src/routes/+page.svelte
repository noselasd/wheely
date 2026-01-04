<script lang="ts">
    import Wheel from '$lib/components/Wheel.svelte';
    import TabContainer from '$lib/components/TabContainer.svelte';
    import * as WD from '$lib/WheelData.svelte';
    import QuickEntries from '$lib/components/QuickEntries.svelte';
    import WinnersComponent from '$lib/components/Winners.svelte';
    import WinnerDialog from '$lib/components/WinnerDialog.svelte';

    let showWinnerDlg = $state(false);
    let lastWinner = $state('');
    WD.setItems([
        {
            label: 'one',
        },
        {
            label: 'two',
        },
        {
            label: 'three',
        },
        {
            label: 'Four',
        },
    ]);
    WD.data.name = 'Spin the Wheel';
    function onWin(winningItem: string) {
        WD.addWinner(winningItem);
        lastWinner = winningItem;
        showWinnerDlg = true;
    }
    $effect(() => {
        const winners = WD.data.winners;
        console.log('Winners', ...winners);
    });
</script>

<WinnerDialog bind:showModal={showWinnerDlg} bind:winner={lastWinner}></WinnerDialog>
<div class="wrapper">
    <div class="top">
        <div class="title">{WD.data.name}</div>
    </div>

    <div class="mid">
        <div class="left shadowbox">
            <div class="wheelbox">
                <Wheel items={WD.data.items} {onWin} />
            </div>
        </div>

        <div class="right shadowbox">
            <div class="panel">
                <TabContainer activeIndex={1}>
                    {#snippet Entries()}<h1>placeholder</h1>{/snippet}
                    {#snippet Quick()}
                        <QuickEntries />
                    {/snippet}
                    {#snippet Winners()}
                        <WinnersComponent />
                    {/snippet}
                </TabContainer>
            </div>
        </div>
    </div>

    <div class="bottom">
        <div class="desc"></div>
    </div>
</div>

<style lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh; // fill viewport
        min-height: 0; // allow children to shrink
    }

    .top,
    .bottom {
        flex: 0 0 auto; // size to content; never collapse
        margin: 0 0; // keep your horizontal centering without vertical auto
    }

    .mid {
        display: flex;
        flex-direction: row;
        flex: 1 1 auto; // take remaining space
        min-height: 0; // KEY: allows .mid to shrink so bottom stays visible
    }

    .left {
        align-items: center;
        display: flex;
        flex-direction: column;
        flex: 8 1 0; // 80% width vs right’s 20%
        margin: 1em;
        min-width: 0;
    }

    .right {
        display: flex;
        flex-direction: column;
        flex: 2 1 0;
        margin: 1em;
        min-width: 0;
    }

    .panel {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        min-height: 0;
        overflow: auto; // scroll inside panel instead of pushing bottom away
    }

    .title {
        flex: 0 0 auto;
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
        flex: 1 1 auto; // fill column height without fixed height
        width: 95%;
        min-height: 0;
    }

    .shadowbox {
        background: var(--app-content-background);
        box-shadow: 0px 0px 10px 5px rgba(183, 179, 179, 0.58);
        -webkit-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.58);
        -moz-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.58);
    }
</style>
