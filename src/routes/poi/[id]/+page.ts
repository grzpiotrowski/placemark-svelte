import { placemarkService } from "../../../services/placemark-service";
import { loggedInUser } from "../../../stores";
import { get } from "svelte/store";
export const ssr = false;

export const load = async ({ params }) => {
  placemarkService.checkPageRefresh();
  const user = get(loggedInUser);
  const poi = await placemarkService.getPoiById(encodeURI(params.id));
  return {
    poi: poi,
    categories: await placemarkService.getAllCategories()
  };
};
