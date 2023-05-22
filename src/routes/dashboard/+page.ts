import { getMarkerLayer } from "../../services/placemark-utils";
import { placemarkService } from "./../../services/placemark-service";
import { loggedInUser } from "../../stores";
export const ssr = false;
import { get } from "svelte/store";

export const load = async ({ params }) => {
	placemarkService.checkPageRefresh();
	const user = get(loggedInUser);
	console.log(user);
	const allLoggedInUserPois = await placemarkService.getPoisByUser(user._id);
	return {
		pois: allLoggedInUserPois,
		poiMarkerLayer: getMarkerLayer(allLoggedInUserPois)
	};
};
