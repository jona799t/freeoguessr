<script>
    import { page } from '$app/stores';
	import { onMount, setContext } from 'svelte';
    import Map from '$lib/Map.svelte';
    import ResultMap from '$lib/ResultMap.svelte';

    const map_id = $page.url.searchParams.get("map");

    let map;
    let round = 0;
    let points = 0;
    
    let blur = true;
    let message;
    let timer;

    onMount(async () => {
        map = await (await fetch(`/api/map?id=${map_id}`)).json();
        console.log(map)
    });

    async function loaded() {
        timer = 3;
        await new Promise(resolve => setTimeout(resolve, 1000));
        timer = 2;
        await new Promise(resolve => setTimeout(resolve, 1000));
        timer = 1;
        await new Promise(resolve => setTimeout(resolve, 1000));
        blur = false;
    }

    function distance(lat0, lng0, lat1, lng1) { // From: https://en.wikipedia.org/wiki/Haversine_formula
        lat0 = lat0 * Math.PI / 180
        lng0 = lng0 * Math.PI / 180
        lat1 = lat1 * Math.PI / 180
        lng1 = lng1 * Math.PI / 180

        return 2 * 6378.137 * Math.asin( ( Math.sin( (lat1-lat0)/2 )**2 + Math.cos(lat0) * Math.cos(lat1) * Math.sin( (lng1 - lng0)/2 )**2 )**(0.5) ) * 1000
    }

    let guessLocation;
    let correctLocation;
    let guessed = false;
    async function guess(marker) {
        correctLocation = [map.rounds[round].lat, map.rounds[round].lng];
        guessLocation = [marker._latlng.lat, marker._latlng.lng];
        
        message = `You were ${distance(marker._latlng.lat, marker._latlng.lng, map.rounds[round].lat, map.rounds[round].lng).toFixed(2)} meters away from the target`
        guessed = true;
    }

    setContext("main", {
        guess: guess
    });
</script>


{#if map}
    {#if blur}
        <div class="absolute top-0 w-full text-center z-50">
            <div class="flex h-screen">
                <div class="m-auto">
                    <h1 class="text-8xl font-bold">{timer}</h1>
                </div>
            </div>
        </div>
    {/if}

    {#if !blur && !guessed}
        <Map view={[50, 0]} zoom={2} guess={guess} />
    {/if}

    <div class="absolute top-0 w-full h-full {blur ? "blur-xl" : ""} -z-10">
        {#if guessed}
            <div class="mt-20 flex justify-center">
                <div class="w-3/5 text-center" style="height: calc(100vh - 128px) !important;">
                    <h1 class="text-3xl font-bold">{message}</h1>
                    <div class="my-4 h-3/5 w-full">
                        <ResultMap guessLocation={guessLocation} correctLocation={correctLocation}/>
                    </div>
                    <div>
                        {#if round < map.rounds.length-1}
                            <button class="btn btn-primary mr-1" on:click={() => {round++; blur = true; guessed=false; loaded}}>Continue</button>
                        {:else}
                            <a class="btn btn-primary mr-1" href="/">Home</a>
                        {/if}
                        <a class="btn" href="https://www.google.com/maps?q&layer=c&cbll={map.rounds[round].lat},{map.rounds[round].lng}" target="_blank">Open</a>
                    </div>
                </div>
            </div>
        {:else}
            {#if map.defaultProvider == "Google Maps"}
                <iframe
                    use:loaded
                    class="w-full h-screen"
                    src="https://www.google.com/maps/embed?pb=!6m8!1m7!{map.rounds[round].panoId}!2m2!1d{map.rounds[round].lat}!2d{map.rounds[round].lng}!3f{map.rounds[round].heading}!4f{map.rounds[round].pitch}!5f{map.rounds[round].zoom}">
                </iframe>
            {/if}
        {/if}
    </div>
{:else}
<div class="absolute top-0">
    <div class="flex h-screen w-screen">
        <div class="m-auto">
            <span class="loading loading-spinner loading-lg"></span>
        </div>
    </div>    
</div>
{/if}