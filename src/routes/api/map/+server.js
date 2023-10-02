import world from "$lib/data/world.json"

export const GET = async ( {url} ) => {
    const id = url.searchParams.get("id");

    let map = {}
    if (id == "world") {
        map.name = "World";
        map.id = id;
        map.defaultProvider = "Google Maps";
        map.rounds = [];
        
        let indexes = [];
        for (let i = 0; i < 5; i++) {
            let index = Math.floor(Math.random() * world.length);
            while (indexes.includes(index)) {
                index = Math.floor(Math.random() * world.length);
            }
            indexes.push(index);
            map.rounds.push(world[index]);
        };
    }
    return new Response(JSON.stringify(map));
}