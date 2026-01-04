export interface Item {
    label: string;
}
export interface WheelData {
    name: string;
    items: Array<Item>;
    winners: Array<string>;
}

export const data: WheelData = $state({
    name: '',
    items: [],
    winners: [],
});

export function setItems(items: Array<Item>) {
    data.items.splice(0, data.items.length, ...items);
}

export function addWinner(winner: string) {
    data.winners.push(winner);
}
export function clearWinners() {
    data.winners.length = 0;
}
