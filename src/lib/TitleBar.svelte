<script lang="ts">
	import { loggedInUser } from "../stores";
	export let title = "";
	export let subTitle = "";
</script>

<div class="box has-text-centered columns m-2">
	<div class="column is-2">
		<img src="/images/placemark-logo.png" width="60" alt="img" />
	</div>
	<div class="column">
		<div class="title is-6">{title}</div>
		<div class="subtitle is-6">{subTitle}</div>
	</div>
	<div class="column">
		<i class="fas fa-map-marked-alt fa-3x" style="color:rgb(95, 96, 173)" />
		{#if $loggedInUser?.email}
			<div class="is-size-7">{$loggedInUser.email}</div>
		{:else}
			<div class="is-size-7">Placemark-Svelte</div>
		{/if}
	</div>
</div>
