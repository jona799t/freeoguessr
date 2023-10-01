<script>
    import { page } from '$app/stores';
	import { setContext } from 'svelte';
    import Map from '$lib/Map.svelte';
    import ResultMap from '$lib/ResultMap.svelte';
    import maps from "$lib/data/maps.json"

    const map_id = $page.url.searchParams.get("map");

    const map = maps[map_id];
    let round = 0;
    let points = 0;


    let blur = true;
    let message;
    let timer;

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
        let lat;
        let lng;

        switch (/https:\/\/[^\/]+/.exec(map[round]).toString()) {
            case "https://www.google.com": 
                lat = parseFloat(/1d\d+.\d+!/.exec(map[round]).toString().replace("1d", "").replace("!", ""));
                lng = parseFloat(/2d\d+.\d+!/.exec(map[round]).toString().replace("2d", "").replace("!", ""));
                break;
            case "https://yandex.com":
                const coords = /ll=\d+.\d+%2C\d+.\d+/.exec(map[round]).toString().split("%2C")
                lng = parseFloat(coords[0].replace("ll=", ""));
                lat = parseFloat(coords[1]);
                break;
            default:
                alert(`Unknown street view provider`)
        }

        correctLocation = [lat, lng];
        guessLocation = [marker._latlng.lat, marker._latlng.lng];

        message = `You were ${distance(marker._latlng.lat, marker._latlng.lng, lat, lng).toFixed(2)} meters away from the target`;
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
            <div class="mt-14 flex justify-center">
                <div class="w-3/5 text-center" style="height: calc(100vh - 128px) !important;">
                    <h1 class="text-3xl font-bold">{message}</h1>
                    <div class="my-4 h-3/5 w-full">
                        <ResultMap guessLocation={guessLocation} correctLocation={correctLocation}/>
                    </div>
                    <div>
                        {#if round < map.length-1}
                            <button class="btn btn-primary mr-1" on:click={() => {round++; blur = true; guessed=false; loaded}}>Continue</button>
                        {:else}
                            <a class="btn btn-primary mr-1" href="/">Home</a>
                        {/if}
                        <a class="btn" href={map[round]} target="_blank">Open</a>
                    </div>
                </div>
            </div>
        {:else}
            <iframe
                use:loaded
                class="w-full h-screen"
                src={map[round]}>
            </iframe>
        {/if}
    </div>
{:else}
    <p>The map id is invalid</p>
{/if}