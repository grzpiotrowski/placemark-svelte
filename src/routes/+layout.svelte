<script lang="ts">
	import { beforeUpdate } from "svelte";
	import { placemarkService } from "../services/placemark-service";

	beforeUpdate(() => {
		placemarkService.checkPageRefresh();
	})

</script>

<div class="container">
	<slot />
</div>
