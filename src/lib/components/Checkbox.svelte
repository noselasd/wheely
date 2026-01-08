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
        background-color: #dfe1e4;
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
        background-color: #fff;
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
        background-color: #c9cbcd;
        transition-duration: 0s;
    }

    .checkbox :checked {
        background-color: #6e79d6;
    }

    .checkbox :checked::after {
        background-color: #fff;
        left: 13px;
    }

    .checkbox :focus:not(.focus-visible) {
        outline: 0;
    }

    .checkbox :checked:hover {
        background-color: #535db3;
    }
</style>
