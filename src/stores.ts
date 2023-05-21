import { writable } from "svelte/store";
import type { Poi, Category, LoggedInUser } from "./services/placemark-types";
import type { MarkerSpec } from "./services/markers";

export const loggedInUser = writable<LoggedInUser>();

export const markerSelected = writable<MarkerSpec>();
