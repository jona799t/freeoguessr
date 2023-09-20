<script>
    import "../app.css";
</script>


<div class="navbar bg-base-100">
    <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl" href="/">Freeoguessr</a>
    </div>
    <div class="flex-none">
        <div class="dropdown dropdown-hover dropdown-end">
            <label tabindex="0" class="btn btn-sm m-1">Maps</label>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a target="_self" href="/guessr?mode=gmaps">Google Maps</a></li>
              <li><a target="_self" href="/guessr?mode=yandex">Yandex Maps</a></li>
              <li><a target="_self" href="/guessr?mode=baidu" class="justify-between">Baidu Map <span class="badge">WIP</span></a></li>
              <li><a target="_self" href="/guessr?mode=kakao" class="justify-between">Kakao Map <span class="badge">WIP</span></a></li>
              <li><a target="_self" href="/guessr?mode=bing" class="justify-between">Bing Maps <span class="badge">WIP</span></a></li>
              <li><a target="_self" href="/guessr?mode=mapillary" class="justify-between">Mapillary <span class="badge">WIP</span></a></li>
              <li><a target="_self" href="/guessr?mode=cartema" class="justify-between">carte.ma <span class="badge">WIP</span></a></li>
            </ul>
        </div>
    </div>
</div>

<slot />