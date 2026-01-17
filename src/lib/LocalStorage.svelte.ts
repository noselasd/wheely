import { browser } from '$app/environment';

export class LocalStorage<T> {
    value = $state<T>() as T;
    key = '';

    constructor(key: string, initialValue: T) {
        this.key = key;

        if (browser) {
            const storedValue = localStorage.getItem(this.key);
            if (storedValue !== null) {
                this.value = JSON.parse(storedValue) as T;
            } else {
                this.value = initialValue;
                localStorage.setItem(this.key, JSON.stringify(initialValue));
            }
        } else {
            this.value = initialValue;
        }

        $effect.root(() => {
            $effect(() => {
                const newValue = this.value;
                if (browser) {
                    localStorage.setItem(this.key, JSON.stringify(newValue));
                }
            });
        });
    }
}
