<script>
    import L from "leaflet";
    import "leaflet/dist/leaflet.css"
    import { onDestroy, onMount, getContext } from "svelte";
    
    export let bounds;
    export let view;
    export let zoom;

    let mapElement;
    let map;

    onMount(() => {
        map = L.map(mapElement);

        L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&language=en", {
            maxZoom: 20,
            edgeBufferTiles: 10,
            subdomains:["mt0","mt1","mt2","mt3"],
            attribution: '&copy; <a href="https://google.com/maps" target="_blank">Google Maps</a>'
        }).addTo(map);
    });

    onDestroy(() => {
        map?.remove();
        map = undefined;
    })

    let lastBounds;
    function fitMap() {
        map.invalidateSize();
        map.fitBounds(lastBounds);
        lastBounds = map.getBounds();
    }

    $: if (map) {
        if (bounds) {
            map.fitBounds(bounds);
        } else if (view && zoom) {
            map.setView(view, zoom)
        }
    }
</script>

<div class="rounded-lg w-full h-full z-0" bind:this={mapElement} on:mouseenter={fitMap} on:mouseleave={fitMap}>
    {#if map}
        <slot />
    {/if}
</div>