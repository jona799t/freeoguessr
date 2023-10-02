<script>
    import L from "leaflet";
    import "leaflet/dist/leaflet.css"
    import { onDestroy, onMount, getContext } from "svelte";
    
    export let bounds;
    export let view;
    export let zoom;

    let mapElement;
    let map;
    let marker;

    const { guess } = getContext("main");

    onMount(() => {
        map = L.map(mapElement);

        L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&language=en", {
            maxZoom: 20,
            edgeBufferTiles: 10,
            keepBuffer: 1000,
            subdomains:["mt0","mt1","mt2","mt3"],
            attribution: '<div class="-mr-1 -mt-20"><div class="leaflet-control-attribution leaflet-control"><a href="https://leafletjs.com" title="A JavaScript library for interactive maps">Leaflet</a> | &copy; <a href="https://google.com/maps" target="_blank">Google Maps</a></div></div>'
        }).addTo(map);

        map.on("click", (click) => {
            marker?.remove();
            marker = L.marker(click.latlng, {
                icon: L.divIcon({
                    className: 'bg-primary rounded-full',
                    html: "",
                    iconSize: [32, 32]
                })
            }).addTo(map);
            map.setView(click.latlng);
        });
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

<div class="absolute bottom-5 right-2 bg-base-100 w-1/5 h-1/5 hover:w-3/5 hover:h-3/5 outline outline-2 outline-base-100">
    <div class="w-full h-full z-0" style="cursor: crosshair !important;" bind:this={mapElement} on:mouseenter={fitMap} on:mouseleave={fitMap}>
        {#if map}
            <slot />
        {/if}
    </div>
    <button class="absolute bottom-0 right-0 w-full btn {marker ? "btn-primary" : "no-animation cursor-not-allowed"} rounded-none z-10" on:click={() => marker ? guess(marker) : null}>{marker ? "Guess" : "Place your guess"}</button>
</div>

