<script lang="ts">
    export const prerender = true;
    import '../styles/app.scss';

    let { children } = $props();
</script>

<div class="app">
    <main>
        {@render children()}
    </main>
</div>

<style>
    main {
        width: 100%;
        height: 100%;
        overscroll-behavior-y: contain;

        /* Prevent iOS rubber-band effect */
        position: fixed;

        /* Prevent browser from handling touch events */
        touch-action: none;
    }
</style>
