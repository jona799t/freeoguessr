<script>
    import "../app.css";

    if (localStorage.getItem("maps") == null) {
        localStorage.setItem("maps", "{}");
    }
</script>

<div class="navbar bg-base-100 h-20">
    <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl" href="/">Freeoguessr</a>
    </div>
    <div class="flex-none">
        <div class="dropdown dropdown-hover dropdown-end">
            <label tabindex="0" class="btn btn-sm m-1">Map providers</label>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a target="_self" href="/providers?mode=gmaps">Google Maps</a></li>
              <li><a target="_self" href="/providers?mode=yandex">Yandex Maps</a></li>
              <li><a target="_self" href="/providers?mode=baidu" class="justify-between">Baidu Map <span class="badge">WIP</span></a></li>
              <li><a target="_self" href="/providers?mode=kakao" class="justify-between">Kakao Map <span class="badge">WIP</span></a></li>
              <li><a target="_self" href="/providers?mode=bing" class="justify-between">Bing Maps <span class="badge">WIP</span></a></li>
              <li><a target="_self" href="/providers?mode=mapillary" class="justify-between">Mapillary <span class="badge">WIP</span></a></li>
              <li><a target="_self" href="/providers?mode=cartema" class="justify-between">carte.ma <span class="badge">WIP</span></a></li>
            </ul>
        </div>
        <!--
        <div class="dropdown dropdown-hover dropdown-end">
            <label tabindex="0" class="btn btn-sm m-1">Games</label>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a target="_self" href="/play?map=ex-soviet">Ex-Soviet</a></li>
            </ul>
        </div>-->
    </div>
</div>

<slot />