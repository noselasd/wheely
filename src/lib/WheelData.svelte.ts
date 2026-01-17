import { LocalStorage } from '$lib/LocalStorage.svelte';

// Overlays the Item interface from spin-wheel package
export interface Item {
    label: string;
    value: { id: number; enabled: boolean };
}
export interface WheelData {
    name: string;
    items: Item[];
    winners: string[];
    settings: {
        clearWinnersAfterSpin: boolean;
    };
}

const defaultData: WheelData = {
    name: 'Spin the Wheel',
    items: [
        {
            label: 'One',
            value: { id: 1, enabled: true },
        },
        {
            label: 'Two',
            value: { id: 2, enabled: true },
        },
        {
            label: 'Three',
            value: { id: 3, enabled: true },
        },
        {
            label: 'Four',
            value: { id: 4, enabled: true },
        },
    ],
    winners: [],
    settings: {
        clearWinnersAfterSpin: false,
    },
};
const dataStorage = new LocalStorage<WheelData>('wheel-data', defaultData);
export const data = dataStorage.value;
initialize();

export function setItems(items: Item[]) {
    data.items.splice(0, data.items.length, ...items);
}

export function disableItemById(id: number) {
    const item = data.items.find((it) => it.value.id === id);
    console.log(`Item with id=${id} disabled.`);
    if (item) {
        item.value.enabled = false;
    }
}

export function addWinner(winner: string) {
    data.winners.push(winner);
}

export function clearWinners() {
    data.winners.length = 0;
}

export function initialize() {
    if (data.items.length === 0) {
        setItems(defaultData.items);
    }
    if (!data.name || data.name.trim() === '') {
        data.name = defaultData.name;
    }
    if (!data.winners || data.winners.length > 0) {
        data.winners = [];
    }
    for (const item of data.items) {
        item.value.enabled = true;
    }
    if (!data.settings) {
        data.settings = defaultData.settings;
    } else if (data.settings.clearWinnersAfterSpin === undefined) {
        data.settings.clearWinnersAfterSpin = defaultData.settings.clearWinnersAfterSpin;
    }
}

export function setClearWinnersAfterSpin(value: boolean) {
    data.settings.clearWinnersAfterSpin = value;
}
