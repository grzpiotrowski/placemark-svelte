import { getMarkerLayers } from "../../services/placemark-utils";
import { placemarkService } from "./../../services/placemark-service";
import { loggedInUser } from "../../stores";
import { get } from "svelte/store";
export const ssr = false;

export const load = async ({ params }) => {
	placemarkService.checkPageRefresh();
	const user = get(loggedInUser);
	const allLoggedInUserPois = await placemarkService.getPoisByUser(user._id);
	return {
		pois: allLoggedInUserPois,
		poiMarkerLayers: getMarkerLayers(allLoggedInUserPois)
	};
};
