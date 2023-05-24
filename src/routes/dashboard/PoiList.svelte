<script lang="ts">
	import type { Poi } from "../../services/placemark-types";
  import { placemarkService } from "./../../services/placemark-service";
	export let pois: Poi[] = [];
  
  async function deletePoi(id: string) {
    try {
      await placemarkService.deletePoi(id);
      pois = pois.filter(poi => poi._id !== id);
    } catch (error) {
      console.log("Error trying to delete POI: " + id);
    }
  }

</script>

{#each pois as poi}
<div class="card">
  <header class="card-header">
    <p class="card-header-title">
      {poi.name}
    </p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-location-pin"></i>
      </span>
    </button>
  </header>
  <div class="card-image">
    <figure class="image is-3by1">
      {#if poi?.img}
        <img src="{poi?.img}" alt="POI Image">
      {:else}
        <img src="images/poi-placeholder.jpg" alt="Placeholder Image">
      {/if}
    </figure>
  </div>
  <div class="card-content">
    <div class="content">
      {poi.description}
    </div>
  </div>
  <footer class="card-footer">
    <a href={`/poi/${poi?._id}`} class="button is-medium is-fullwidth">
      <i class="fas fa-folder-open"></i>
    </a>
    <button class="button is-medium is-fullwidth" on:click={() => deletePoi(poi?._id)}>
      <i class="fas fa-trash-alt" style="color:red"></i>
    </button>
  </footer>
</div>
<br>
{/each}
