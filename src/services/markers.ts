import type { LatLng } from "leaflet";
import type { Category } from "./placemark-types";

export interface MarkerSpec {
	id: string;
	name: string;
	location: LatLng;
}

export interface MarkerLayer {
	name: string;
	markerSpecs: MarkerSpec[];
}
