<script lang="ts">
    interface Props {
        checked?: boolean;
        title?: string;
    }

    let { checked = $bindable(false), title = '' }: Props = $props();
</script>

<div class="checkbox">
    <input {title} bind:checked id="edit-check" type="checkbox" class="checkbox" />
</div>

<style lang="scss">
    .checkbox {
        appearance: none;
        background-color: var(--app-body-background);
        border-radius: 72px;
        border-style: none;
        flex-shrink: 0;
        height: 20px;
        margin: 0;
        position: relative;
        width: 30px;
    }

    .checkbox ::before {
        bottom: -6px;
        content: '';
        left: -6px;
        position: absolute;
        right: -6px;
        top: -6px;
    }

    .checkbox,
    .checkbox ::after {
        transition: all 100ms ease-out;
    }

    .checkbox ::after {
        background-color: var(--app-icon-color);
        border-radius: 50%;
        content: '';
        height: 14px;
        left: 3px;
        position: absolute;
        top: 3px;
        width: 14px;
    }

    .checkbox input[type='checkbox'] {
        cursor: default;
    }

    .checkbox :hover {
        background-color: var(--app-content-background);
        transition-duration: 0s;
    }

    .checkbox :checked {
        background-color: var(--app-solid-button-color);
    }

    .checkbox :checked::after {
        background-color: var(--app-text-color);
        left: 13px;
    }

    .checkbox :focus:not(.focus-visible) {
        outline: 0;
    }

    .checkbox :checked:hover {
        background-color: var(--app-solid-button-color-darker);
    }
</style>
