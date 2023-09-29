<script>
    let name;
    let data;
    
    let jsonData;
    let map;

    let error;

    function _continue() {
        let allowed = true;

        try {
            jsonData = JSON.parse(data);
        } catch (err) {
            error = "The map data is not valid";
            document.getElementById("error_modal").showModal();
            allowed = false;
        }
        if (!name) {
            error = "Please name your map";
            document.getElementById("error_modal").showModal();
            allowed = false;
        }

        if (allowed) {
            map = btoa(JSON.stringify({
                name: name,
                data: jsonData
            }));

            location.href = "/import?map=" + map;
        }
    }
</script>

<div class="max-w-[86rem] m-auto p-6">
    <div class="grid lg:grid-cols-3 gap-4">
        <div class="bg-base-200 rounded-xl p-4">
            <div>
                <h2 class="font-bold text-xl mb-1">How to make a map?</h2>
                <p>In order to make a map you have to use a thrid party solution.</p>
                <p>These solutions help you make your map, and then allows you to paste in the map as a JSON string.</p>
            </div>
            
            <div class="my-4">
                <h2 class="font-bold text-xl mb-1">The automatic solution</h2>
                <p>By far the easiest map maker to use is</p>
                <p><a class="link" href="https://map-generator.vercel.app/" target="_blank">map-generator.vercel.app</a> as it automatically searches through Street View coverage and makes a map out of that.</p>
                <p>The only downside is that it is a bit resource heavy.</p>
            </div>
            
            <div class="mt-4">
                <h2 class="font-bold text-xl mb-1">The semi-manual solution</h2>
                <p>This map marker is the perfect solution if you want to carefully pick your location</p>
                <p><a class="link" href="https://map-making.app/" target="_blank">map-making.app</a>.</p>
                <p>Unlike the automatic solution, this one is not as resource heavy.</p>
            </div>
        </div>

        <div class="lg:col-span-2 bg-base-200 rounded-xl p-4">
            <div>
                <h2 class="font-bold text-xl mb-1">What should your map be named?</h2>
                <input type="text" placeholder="The map name" class="input input-bordered w-full" bind:value={name} />
            </div>
            
            <div class="my-4">
                <h2 class="font-bold text-xl mb-1">Default map</h2>
                <p>This is the map provider which will be used unless another is specified in the JSON item</p>
                <select class="select select-bordered w-full">
                    <option selected>Google Maps</option>
                    <option>Yandex Maps</option>
                </select>
            </div>
            
            <div class="my-4">
                <h2 class="font-bold text-xl mb-1">Map data</h2>
                <p class="mb-1">Please copy the JSON data from the map maker and insert it underneath:</p>
                <textarea class="textarea textarea-bordered w-full h-96 resize-none" placeholder="{"{}"}" bind:value={data}></textarea>
            </div>

            <div class="mt-4">
                <button class="btn btn-primary" on:click={_continue}>Continue</button>
            </div>
        </div>
    </div>
</div>

<dialog id="error_modal" class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Error</h3>
        <p class="py-4">{error}</p>
        <div class="modal-action">
            <form method="dialog">
            <button class="btn">Close</button>
        </form>
    </div>
    </div>
        <form method="dialog" class="modal-backdrop">
        <button>Close</button>
    </form>
</dialog>