<script lang="ts">
    import Wheel from '$lib/components/Wheel.svelte';
    import TabContainer from '$lib/components/TabContainer.svelte';
    import * as WD from '$lib/WheelData.svelte';
    import QuickEntries from '$lib/components/QuickEntries.svelte';
    import WinnersComponent from '$lib/components/Winners.svelte';
    import WinnerDialog from '$lib/components/WinnerDialog.svelte';
    import TitleDialog from '$lib/components/TitleDialog.svelte';
    import type { Item } from '$lib/WheelData.svelte';
    import { version } from '$app/environment';
    import { onMount } from 'svelte';

    let showWinnerDlg = $state(false);
    let showEditTitleDlg = $state(false);
    let lastWinner: Item = $state({ label: '', value: { id: -1, enabled: true } });
    let clearWinners = $state(WD.data.settings.clearWinnersAfterSpin);

    function onWin(winningItem: Item) {
        WD.addWinner(winningItem.label);
        console.log('Winning item', winningItem);
        lastWinner = winningItem;
        showWinnerDlg = true;
    }
    $effect(() => {
        WD.setClearWinnersAfterSpin(clearWinners);
    });

    function onCloseWinnerDialog() {
        if (clearWinners) {
            lastWinner.value.enabled = false;
            WD.disableItemById(lastWinner.value.id);
        }
        showWinnerDlg = false;
    }
</script>

<WinnerDialog bind:showModal={showWinnerDlg} winner={lastWinner} onClose={onCloseWinnerDialog}
></WinnerDialog>
<TitleDialog bind:showModal={showEditTitleDlg} bind:title={WD.data.name}></TitleDialog>

<div class="wrapper">
    <div class="top">
        <div class="title">{WD.data.name}</div>
        <button
            class="cool-button button"
            title="Edit title"
            onclick={() => (showEditTitleDlg = true)}>🖉</button>
        <small class="version">v.{version}</small>
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
                    {#snippet Entries()}
                        <QuickEntries bind:clearWinners />
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
        height: 100svh; // fill viewport
        min-height: 0; // allow children to shrink
    }

    .top,
    .bottom {
        display: flex;
        flex: 0 0 auto; // size to content; never collapse
        flex-direction: row;
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
    .button {
        color: var(--app-content-text-color);
        background-color: var(--app-widget-button-color);
        margin: auto 0;
    }
    .shadowbox {
        background: var(--app-content-background);
        box-shadow: 0px 0px 10px 5px rgba(183, 179, 179, 0.58);
        -webkit-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.58);
        -moz-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.58);
    }
    .version {
        margin: auto 1em auto auto;
        color: var(--app-disabled-text-color);
        font-size: 0.7em;
    }
</style>
