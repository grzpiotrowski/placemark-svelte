import axios from "axios";
import { loggedInUser } from "../stores";
import type { Poi, Category } from "./placemark-types";

export const placemarkService = {
	baseUrl: "https://grzegorz-placemark.glitch.me",
	//baseUrl: "http://localhost:3000",

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
				localStorage.placemark = JSON.stringify({ email: email, token: response.data.token, _id: response.data.id });
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

	async createPoi(poi: any) {
		try {
		await axios.post(`${this.baseUrl}/api/pois`, poi);
		} catch (error) {
			console.error("Error creating a POI", error);
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

	async uploadImage(imgBase64: string, id: string): Promise<void> {
		const formData = new FormData();
		formData.append("imagefile", imgBase64);
		
		await axios.post(`${this.baseUrl}/api/pois/${id}/images`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
		});
		
    },

	async deleteImage(id: string): Promise<void> {
		try {
			await axios.delete(`${this.baseUrl}/api/pois/${id}/images`);
		} catch (error) {
			console.error(`Error deleting Image on POI with id ${id}`, error);
			return;
		}
	}
	
};
