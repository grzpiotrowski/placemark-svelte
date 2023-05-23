import { placemarkService } from "./../../services/placemark-service";
import { loggedInUser } from "../../stores";
import { get } from "svelte/store";

export const load = async ({ params }) => {
	placemarkService.checkPageRefresh();
	const user = get(loggedInUser);
	return {
		pois: placemarkService.getPoisByUser(user._id),
		categories: await placemarkService.getAllCategories(),
		userid: user._id
	};
};
