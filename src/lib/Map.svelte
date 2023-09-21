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

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 20,
            edgeBufferTiles: 10,
            attribution: '<p class="-mt-20">&copy; <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors</p>'
        }).addTo(map);

        map.on("click", (click) => {
            marker?.remove();
            marker = L.marker(click.latlng, {
                icon: L.icon({
                    iconUrl: "leaflet/marker-icon.png",
                    shadowUrl: "leaflet/marker-shadow.png",
                })
            }).addTo(map);
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

<div class="absolute bottom-0 right-0 bg-base-100 w-1/5 h-1/5 hover:w-2/5 hover:h-2/5 outline outline-2 outline-base-100">
    <div class="w-full h-full z-0" bind:this={mapElement} on:mouseenter={fitMap} on:mouseleave={fitMap}>
        {#if map}
            <slot />
        {/if}
    </div>
    <button class="absolute bottom-0 right-0 w-full btn {marker ? "btn-primary" : "no-animation cursor-not-allowed"} rounded-none z-10" on:click={() => marker ? guess(marker) : null}>{marker ? "Guess" : "Place your guess"}</button>
</div>

