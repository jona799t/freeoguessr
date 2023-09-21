<script>

    const source = `
    # Freeoguessr
    A free world guesser using no api keys with coverage for most countries in the world.

    ## Progress
    Street view is visible on all services. The map/guessing is not done yet.  
    Multiplayer could also be a fun thing to add.  
    | Service     | Why?                          | Progress                                                      |
    |-------------|-------------------------------|---------------------------------------------------------------|
    | Google Maps | Has coverage most places      | Street view works, can calculate distance from guess          |
    | Yandex Maps | Ex-soviet coverage            | Street view works, can calculate distance from guess          |
    | Baidu Map   | China coverage                | Street view works but really slow and the location is visible |
    | Kakao Map   | South Korea coverage          | Street view works but the location is visible                 |
    | Bing Maps   | IDK, will probably be removed | Street view works but the location is visible                 |
    | Mapillary   | "Rare" coverage               | Street view works                                             |
    | Carte.ma    | Morocco coverage              | Street view works but the location is visible                 |

    ## Missing
    What is missing?
    * Map
    * Random locations
    * User made locations
    * Database
    `
</script>

<div class="max-w-[86rem] m-auto p-6">
    <h1 class="font-bold text-5xl mb-2">Freeoguessr</h1>
    <p class="mb-8">A free and open source world guesser with coverage for most countries in the world.</p>

    <h2 class="font-bold text-4xl mb-2">Progress</h2>
    <p>Street view is visible on all services. The map/guessing works on Google Maps and Yandex.</p>
    <p>Multiplayer could also be a fun thing to add.</p>
    <div class="overflow-x-auto">
        <table class="table table-zebra">
            <thead>
                <tr>
                    <th>Service</th>
                    <th>Why?</th>
                    <th>Progress</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Google Maps</th>
                    <td>Street view works, can calculate distance from guess</td>
                    <td>Street view works, can calculate distance from guess</td>
                </tr>
                <tr>
                    <th>Yandex Maps</th>
                    <td>Ex-soviet coverage</td>
                    <td>Street view works, can calculate distance from guess</td>
                </tr>
                <tr>
                    <th>Baidu Map</th>
                    <td>China coverage</td>
                    <td>Street view works but really slow and the location is visible</td>
                </tr>
                <tr>
                    <th>Kakao Map</th>
                    <td>South Korea coverage</td>
                    <td>Street view works but the location is visible</td>
                </tr>
                <tr>
                    <th>Bing Maps</th>
                    <td>IDK, will probably be removed</td>
                    <td>Street view works but the location is visible</td>
                </tr>
                <tr>
                    <th>Mapillary</th>
                    <td>Unique coverage</td>
                    <td>Street view works</td>
                </tr>
                <tr>
                    <th>Carte.ma</th>
                    <td>Morocco coverage</td>
                    <td>Street view works but the location is visible</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h2 class="font-bold text-4xl mb-2">What is missing?</h2>
    <ul class="list-disc">
        <li>Result map</li>
        <li>Random locations</li>
        <li>User made locations</li>
        <li>Database</li>
        <li>Mobile responsive</li>
        <li>A better frontpage</li>
    </ul>
</div>