import { getMarkerLayer } from "../../services/placemark-utils";
import { placemarkService } from "./../../services/placemark-service";
export const ssr = false;

export const load = async ({ params }) => {
	placemarkService.checkPageRefresh();
	const allPois = await placemarkService.getPois();
	return {
		pois: allPois,
		poiMarkerLayer: getMarkerLayer(allPois)
	};
};
