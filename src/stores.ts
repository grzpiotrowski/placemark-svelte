import { writable } from "svelte/store";
import type { Poi, Category, LoggedInUser } from "./services/placemark-types";

export const loggedInUser = writable<LoggedInUser>();
