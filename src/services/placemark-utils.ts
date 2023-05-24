import { LatLng } from "leaflet";
import type { Poi, ChartData } from "./placemark-types";
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
	return { name: "poi", markerSpecs: markerSpecs };
}

export function getMarkerLayers(pois: Poi[]): MarkerLayer[] {
	const layers: Record<string, MarkerSpec[]> = {};
  
	pois.forEach((poi) => {
	  if (!layers[poi.category.name]) {
		layers[poi.category.name] = [];
	  }
	  
	  layers[poi.category.name].push({
		id: poi._id,
		name: poi.name,
		location: new LatLng(poi.latitude, poi.longitude),
	  });
	});
  
	const layerKeys = Object.keys(layers);

	const markerLayers = layerKeys.map((category) => {
		const markerLayer = {
			name: category,
			markerSpecs: layers[category]
		};

		return markerLayer;
	});

	return markerLayers;
}

export function generateByCategory(poiList: Poi[]): ChartData {
	const totalByCategory: ChartData = {
		labels: [] as string[],
		datasets: [
			{
				values: [] as number[]
			}
		]
	};

	const categoryCount: { [key: string]: number } = {};

	poiList.forEach((poi) => {
		if (!categoryCount[poi.category.name]) {
			categoryCount[poi.category.name] = 1;
		} else {
			categoryCount[poi.category.name]++;
		}
	});

	for (const category in categoryCount) {
		totalByCategory.labels.push(category);
		totalByCategory.datasets[0].values.push(categoryCount[category]);
	}

	return totalByCategory;
}
