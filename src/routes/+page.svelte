<script lang="ts">
	import Header from "$lib/Header.svelte";
	import WelcomeNavigator from "$lib/WelcomeNavigator.svelte";
</script>

<Header>
	<WelcomeNavigator />
</Header>

<div class="columns is-vcentered content">
	<div class="column has-text-centered">
		<img width="300" src="images/map-people.png" alt="homer" />
	</div>
	<div class="column">
		<h1 class="title">Find your favourite place!</h1>
		<p>Browse through the world.</p>
	</div>
</div>
