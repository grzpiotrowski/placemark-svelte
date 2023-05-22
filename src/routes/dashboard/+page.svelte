<script lang="ts">
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import { placemarkService } from "../../services/placemark-service";
	import type { PageData } from "./$types";
	import PoiList from "./PoiList.svelte";
	export let data: PageData;

    const { pois } = data;
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns">
	<div class="column box has-text-centered">
        <PoiList {pois}/>
	</div>
</div>
