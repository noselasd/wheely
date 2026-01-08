// Overlays the Item interface from spin-wheel package
export interface Item {
    label: string;
    value: { id: number; enabled: boolean };
}
export interface WheelData {
    name: string;
    items: Item[];
    winners: string[];
}

export const data: WheelData = $state({
    name: '',
    items: [],
    winners: [],
});

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
