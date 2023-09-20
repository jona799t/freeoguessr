<script>
    import { page } from '$app/stores';
	import { setContext } from 'svelte';
    import Map from '$lib/Map.svelte';
    
    let mode = $page.url.searchParams.get("mode") || "gmaps";
    let initialView = [50, 0];

    const urls = {
        gmaps: "https://www.google.com/maps/embed?pb=!4v1695140268884!6m8!1m7!1sFD8PlQnW3mAGdy0rh5hK3Q!2m2!1d55.77453010675519!2d12.51511628303025!3f108.189285!4f0!5f0.7820865974627469",
        yandex: "https://yandex.com/map-widget/v1/?l=stv%2Csta&ll=27.631903%2C53.911297&panorama%5Bdirection%5D=358.619000%2C0.000000&panorama%5Bfull%5D=true&panorama%5Bpoint%5D=27.573603%2C53.917919&panorama%5Bspan%5D=113.050939%2C60.000000&z=12.54",
        baidu: "https://map.baidu.com/@11590057.96,4489812.75,4z#panoid=09024300121903111025076672B&panotype=street&heading=327.9&pitch=-9.69&l=4&tn=B_NORMAL_MAP&sc=0&newmap=1&shareurl=1&pid=09024300121903111025076672B", // Tager tid om at load, lav en som kigger på urlen og venter på at den er loaded
        kakao: "https://kko.to/TV1wWkxZ0J", // Tager tid om at load, lav en som kigger på urlen og venter på at den er loaded
        bing: "https://cors.eu.org/https://www.bing.com/maps?cp=55.702243%7E12.518793&lvl=11.4&pi=37.5&style=x&dir=151.9",
        mapillary: "https://www.mapillary.com/embed?map_style=Mapillary%20streets&image_key=122259467252827&x=0.5064171508626973&y=0.48773720638784246&style=photo",
        cartema: "http://fes.carte.ma/view/fes.php"
    };

    if (urls[mode] == undefined) {
        alert("The mode you have selected is not valid.");
        mode = "gmaps";
    }

    let blur = true;
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

    function guess(marker) {
        alert(`Du har gættet på: (${marker._latlng.lat}, ${marker._latlng.lng})`);
    }

    setContext("main", {
        guess: guess
    });
</script>

{#if blur}
    <div class="absolute top-0 w-full text-center z-50">
        <div class="flex h-screen">
            <div class="m-auto">
                <h1 class="text-8xl font-bold">{timer}</h1>
            </div>
        </div>
    </div>
{/if}

{#if !blur}
    <Map view={initialView} zoom={2} guess={guess} />
{/if}

<div class="absolute top-0 w-full {blur ? "blur-xl" : ""} -z-10">
    <iframe
        use:loaded
        class="w-full h-screen"
        src={urls[mode]}>
    </iframe>
</div>