<script>
    import L from "leaflet";
    import "leaflet/dist/leaflet.css"
    import { onDestroy, onMount, setContext } from "svelte";
    
    export let bounds;
    export let view;
    export let zoom;

    let mapElement;
    let map;
    let marker;

    onMount(() => {
        map = L.map(mapElement);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
            edgeBufferTiles: 10,
            attribution: '<p class="-mt-20">&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,&copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a></p>'
        }).addTo(map);

        map.on("click", (click) => {
            console.log(click)
            marker?.remove();
            marker = L.marker(click.latlng).addTo(map);
            map.setView(click.latlng)
        });
    });

    onDestroy(() => {
        map?.remove();
        map = undefined;
    })

    let lastBounds;
    function fitMap() {
        map.invalidateSize()
        map.fitBounds(lastBounds);
        console.log(lastBounds, map.getBounds())
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

<div class="w-full h-full z-0" bind:this={mapElement} on:mouseenter={fitMap} on:mouseleave={fitMap}>
    {#if map}
        <slot />
    {/if}
</div>