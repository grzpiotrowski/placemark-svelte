import axios from "axios";
import { loggedInUser } from "../stores";
import type { Poi, Category } from "./placemark-types";

export const placemarkService = {
	baseUrl: "http://localhost:3000",

	async login(email: string, password: string): Promise<boolean> {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
			axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
			if (response.data.success) {
				loggedInUser.set({
					email: email,
					token: response.data.token,
					_id: response.data.id
				});
				localStorage.placemark = JSON.stringify({ email: email, token: response.data.token });
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async logout() {
		loggedInUser.set({
			email: "",
			token: "",
			_id: ""
		});
		axios.defaults.headers.common["Authorization"] = "";
		localStorage.removeItem("placemark");
	},

	async signup(firstName: string, lastName: string, email: string, password: string): Promise<boolean> {
		try {
			const userDetails = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password
			};
			await axios.post(this.baseUrl + "/api/users", userDetails);
			return true;
		} catch (error) {
			return false;
		}
	},

	checkPageRefresh() {
		if (!axios.defaults.headers.common["Authorization"]) {
			const placemarkCredentials = localStorage.placemark;
			if (placemarkCredentials) {
				const savedUser = JSON.parse(placemarkCredentials);
				loggedInUser.set({
					email: savedUser.email,
					token: savedUser.token,
					_id: savedUser._id
				});
				axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
			}
		}
	},

	async getAllCategories(): Promise<Category[]> {
		try {
			const response = await axios.get(this.baseUrl + "/api/categories");
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async getPois(): Promise<Poi[]> {
		try {
			const response = await axios.get(this.baseUrl + "/api/pois");
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async getPoiById(id: string): Promise<Poi> {
		try {
			const response = await axios.get(this.baseUrl + "/api/pois/" + id);
			console.log(response);
			return response.data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	},

	async getPoisByUser(userId: string): Promise<Poi[]> {
		try {
			const response = await axios.get(this.baseUrl + "/api/users/" + userId + "/pois");
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async deletePoi(id: string): Promise<void> {
		try {
			await axios.delete(`${this.baseUrl}/api/pois/${id}`);
		} catch (error) {
			console.error(`Error deleting POI with id ${id}`, error);
			return;
		}
	},

	async updatePoi(id: string, poiData: any): Promise<void> {
		try {
			await axios.patch(`${this.baseUrl}/api/pois/${id}`, poiData);
		} catch (error) {
			console.error(`Error deleting POI with id ${id}`, error);
			return;
		}
	},
	
};
