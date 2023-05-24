<script lang="ts">
    import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
    import type { Poi, Category } from "../../../services/placemark-types"
    import { placemarkService } from "../../../services/placemark-service";
    import type { PageData } from "./$types";
	export let data: PageData;

    const poi = data.poi;
    const id = poi._id;
    const categories = data.categories;

    let isEditing = false;

    async function saveData() {
        const selectedCategory = categories.find(c => c.name === poi.category.name);
        const poiData = {
            name: poi.name,
            description: poi.description,
            category: selectedCategory ? selectedCategory._id : undefined,
            latitude: poi.latitude,
            longitude: poi.longitude
		};
        await placemarkService.updatePoi(poi._id, poiData);
        isEditing = false;
    };

    let fileInput: HTMLInputElement;
    let files: FileList;
    let imageString: string;

    function getBase64(image: File) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            imageString = e.target!.result as string;
            placemarkService.uploadImage(e.target!.result as string, id);
        };
    };

    async function deleteImage() {
        await placemarkService.deleteImage(poi._id);
    }

</script>

<Header>
	<MainNavigator />
</Header>
  
<section class="section">
	{#if isEditing}
		<div class="title">
			<input type="text" bind:value={poi.name} />
		</div>
        <div>
            <input class="hidden" id="file-to-upload" type="file" accept=".png,.jpg" bind:files bind:this={fileInput} on:change={() => getBase64(files[0])}/>
            <button class="upload-btn" on:click={ () => fileInput.click() }>Upload</button>
            <button class="delete-btn" on:click={ () => deleteImage() }>Delete</button>
        </div>
		<figure class="image is-3by1">
			{#if poi.img}
            <img src={poi.img} alt="POI Image" />
			{:else}
				<img src="../../images/poi-placeholder.jpg" alt="Placeholder Image" />
			{/if}
		</figure>
		<table class="table">
			<tbody>
				<tr>
					<td>Category:</td>
                    <td>
                        <select bind:value={poi.category.name}>
                            {#each categories as category}
                                <option>{category.name}</option>
                            {/each}
                        </select>
                    </td>
				</tr>
				<tr>
					<td>Description:</td>
					<td><input type="text" bind:value={poi.description} /></td>
				</tr>
				<tr>
					<td>Latitude:</td>
					<td><input type="number" bind:value={poi.latitude} /></td>
				</tr>
				<tr>
					<td>Longitude:</td>
					<td><input type="number" bind:value={poi.longitude} /></td>
				</tr>
			</tbody>
		</table>
		<button class="button" on:click={saveData}>Save Changes</button>
	{:else}
		<div class="title">
			{poi.name}
		</div>
		<figure class="image is-3by1">
			{#if poi.img}
				<img src="{poi.img}" alt="POI Image" />
			{:else}
				<img src="../../images/poi-placeholder.jpg" alt="Placeholder Image" />
			{/if}
		</figure>
		<table class="table">
			<tbody>
				<tr>
					<td>Category:</td>
					<td>{poi.category.name}</td>
				</tr>
				<tr>
					<td>Description:</td>
					<td>{poi.description}</td>
				</tr>
				<tr>
					<td>Latitude:</td>
					<td>{poi.latitude}</td>
				</tr>
				<tr>
					<td>Longitude:</td>
					<td>{poi.longitude}</td>
				</tr>
			</tbody>
		</table>
		<button class="button" on:click={() => isEditing = true}>Edit POI</button>
	{/if}
</section>


<style>
    .hidden {
        display: none;
    }
</style>