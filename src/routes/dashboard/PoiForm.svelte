<script lang="ts">
	import Coordinates from "$lib/Coordinates.svelte";
	import { placemarkService } from "../../services/placemark-service";
    import type { Category, LoggedInUser } from "../../services/placemark-types";
	import { loggedInUser } from "../../stores";
	export let categories: Category[] = [];
    import { get } from "svelte/store";

    const user = get(loggedInUser);

    let name = "";
    let description = "";
	let latitude = 52.160858;
	let longitude = -7.15242;

	let selectedCategoryName = categories[0].name;

    async function addPoi() {
        const selectedCategory = categories.find(c => c.name === selectedCategoryName);
        const poiData = {
            name: name,
            userid: user._id,
            description: description,
            category: selectedCategory ? selectedCategory._id : undefined,
            latitude: latitude,
            longitude: longitude
		};
        await placemarkService.createPoi(poiData);
    }
</script>

<form on:submit|preventDefault={addPoi}>
    <div class="field">
		<label class="label" for="name">Name</label>
		<input bind:value={name} class="input" id="name" name="name" type="text"/>
	</div>
	<div class="field">
		<label class="label" for="description">Description</label>
		<input bind:value={description} class="input" id="description" name="description" type="text"/>
	</div>
	<div class="field">
		<div class="select">
            <select bind:value={selectedCategoryName}>
                {#each categories as category}
                    <option>{category.name}</option>
                {/each}
            </select>
		</div>
	</div>
	<Coordinates bind:latitude bind:longitude />
	<div class="field">
		<div class="control">
			<button class="button is-link is-light">Add POI</button>
		</div>
	</div>
</form>
