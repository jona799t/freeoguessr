<script>
    import L from "leaflet";
    import "leaflet/dist/leaflet.css"
    import { onDestroy, onMount, getContext } from "svelte";
    
    export let guessLocation;
    export let correctLocation;

    let mapElement;
    let map;

    onMount(() => {
        map = L.map(mapElement, {
            zoomAnimation: true,
        });

        L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&language=en", {
            maxZoom: 20,
            edgeBufferTiles: 10,
            keepBuffer: 1000,
            subdomains:["mt0","mt1","mt2","mt3"],
            attribution: '&copy; <a href="https://google.com/maps" target="_blank">Google Maps</a>'
        }).addTo(map);

        let markerGuess = L.marker(guessLocation, {
            icon: L.divIcon({
                className: 'bg-primary rounded-full',
                html: "",
                iconSize: [32, 32]
            })
        });
        markerGuess.addTo(map);

        let markerCorrect = L.marker(correctLocation, {
            icon: L.divIcon({
                className: 'bg-success rounded-full',
                html: "",
                iconSize: [32, 32]
            })
        });
        markerCorrect.addTo(map);

        let group = new L.featureGroup([markerGuess, markerCorrect]);
        map.fitBounds(group.getBounds());
    });

    onDestroy(() => {
        map?.remove();
        map = undefined;
    })
</script>

<div class="rounded-lg w-full h-full z-0" bind:this={mapElement}>
    {#if map}
        <slot />
    {/if}
</div>