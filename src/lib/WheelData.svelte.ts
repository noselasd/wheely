export interface Item {
	label: string;
}
export interface WheelData {
	name: string;
	items: Array<Item>;
}

export const data: WheelData = $state({
	name: '',
	items: []
});

export function setItems(items: Array<Item>) {
	data.items.splice(0, data.items.length, ...items);
}
