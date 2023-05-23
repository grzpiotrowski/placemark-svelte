<script lang="ts">
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import PoiList from "./PoiList.svelte";
    import PoiForm from "./PoiForm.svelte";
    import type { PageData } from "./$types";
	export let data: PageData;

    const pois = data.pois;
    const categories = data.categories;
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns">
	<div class="column box has-text-centered">
        <PoiForm {categories}/>
        <PoiList {pois}/>
	</div>
</div>
