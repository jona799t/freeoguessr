<script>
    import { page } from '$app/stores'

    const map = $page.url.searchParams.get("map");
    let jsonMap;
    let ready = false;
    if (map) {
        jsonMap = JSON.parse(atob(map));
        let maps = JSON.parse(localStorage.getItem("maps"));
        console.log(maps);
        maps[jsonMap.name.toLowerCase()] = jsonMap;
        localStorage.setItem("maps", JSON.stringify(maps));
        ready = true;
    }
</script>

<div class="max-w-[86rem] m-auto p-6">
    {#if map}
        {#if ready}
            <p>{jsonMap.name} has been imported</p>
            <button class="btn btn-primary">Play now</button>
        {:else}
            <p>Importing the map {jsonMap.name}...</p>
        {/if}
    {:else}
        <p>The url is invalid</p>
    {/if}
</div>