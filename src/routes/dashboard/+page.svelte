<script lang="ts">
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<Header>
	<MainNavigator />
</Header>

<div class="columns">
	<div class="column box has-text-centered">
		<ul>
			{#each data.pois as poi (poi._id)}
				<li>{poi.name}</li>
			{/each}
		</ul>
	</div>
</div>
