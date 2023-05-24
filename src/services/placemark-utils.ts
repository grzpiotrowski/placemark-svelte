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

	// Create a map to store the count of POIs by category
	const categoryCount: { [key: string]: number } = {};

	poiList.forEach((poi) => {
		if (!categoryCount[poi.category.name]) {
			// If the category is not in the map yet, add it with count 1
			categoryCount[poi.category.name] = 1;
		} else {
			// If the category is already in the map, increment the count
			categoryCount[poi.category.name]++;
		}
	});

	// Convert the category map to arrays for your chart data
	for (const category in categoryCount) {
		totalByCategory.labels.push(category);
		totalByCategory.datasets[0].values.push(categoryCount[category]);
	}

	return totalByCategory;
}
