import { LatLng } from "leaflet";
import type { Poi } from "./placemark-types";
import type { MarkerLayer, MarkerSpec } from "./markers";

export function getMarkerLayer(pois: Poi[]): MarkerLayer {
	const markerSpecs = Array<MarkerSpec>();
	pois.forEach((poi) => {
		markerSpecs.push({
			id: poi._id,
			name: poi.name,
			location: new LatLng(poi.latitude, poi.longitude)
		});
	});
	return { name: "pois", markerSpecs: markerSpecs };
}
