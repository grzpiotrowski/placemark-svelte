<script lang="ts">
	import type { Poi } from "../../services/placemark-types";
	export let pois: Poi[] = [];
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
      <img src="images/poi-placeholder.jpg" alt="Placeholder Image">
    </figure>
  </div>
  <div class="card-content">
    <div class="content">
      {poi.description}
    </div>
  </div>
  <footer class="card-footer">
    <a href={`/poi/${poi._id}`} class="button is-medium is-fullwidth">
      <i class="fas fa-folder-open"></i>
    </a>
    <a href={`/dashboard/deletepoi/${poi._id}`} class="button is-medium is-fullwidth">
      <i class="fas fa-trash-alt" style="color:red"></i>
    </a>
  </footer>
</div>
<br>
{/each}
