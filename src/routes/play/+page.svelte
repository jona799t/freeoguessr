<script>
    import { page } from '$app/stores';
	import { setContext } from 'svelte';
    import Map from '$lib/Map.svelte';
    import maps from "$lib/data/maps.json"

    const map_id = $page.url.searchParams.get("map");

    const map = maps[map_id];
    let round = 0;
    let points = 0;


    let blur = true;
    let message;

    async function loaded() {
        message = 3;
        await new Promise(resolve => setTimeout(resolve, 1000));
        message = 2;
        await new Promise(resolve => setTimeout(resolve, 1000));
        message = 1;
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

        message = `You were ${distance(marker._latlng.lat, marker._latlng.lng, lat, lng).toFixed(2)} meters away from the target`
        blur = true;
        
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (round < map.length-1) {
            round++;
            loaded();
        } else {
            message = "The game is over"
        }
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
                <h1 class="text-8xl font-bold">{message}</h1>
            </div>
        </div>
    </div>
    {/if}

    {#if !blur}
        <Map view={[50, 0]} zoom={2} guess={guess} />
    {/if}

    <div class="absolute top-0 w-full {blur ? "blur-xl" : ""} -z-10">
        <iframe
            use:loaded
            class="w-full h-screen"
            src={map[round]}>
        </iframe>
    </div>
{:else}
    <p>The map id is invalid</p>
{/if}