<script lang="ts">
	// @ts-ignore
	import Chart from "svelte-frappe-charts";
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
		<h1 class="title is-4">Places by Category (All Users)</h1>
		<Chart bind:data={data.byCategory} type='pie' />
		<Chart bind:data={data.byCategory} type='bar' />
	</div>
</div>