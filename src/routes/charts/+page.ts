import { generateByCategory } from "../../services/placemark-utils";
import { placemarkService } from "./../../services/placemark-service";
export const ssr = false;

export const load = async ({ params }) => {
	placemarkService.checkPageRefresh();

	const pois = await placemarkService.getPois();

	return {
		pois: await placemarkService.getPois(),
		byCategory: generateByCategory(pois)
	};
};
