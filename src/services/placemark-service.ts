import axios from "axios";
import { loggedInUser } from "../stores";
import type { Poi } from "./placemark-types";

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

	async getPois(): Promise<Poi[]> {
		try {
			const response = await axios.get(this.baseUrl + "/api/pois");
			return response.data;
		} catch (error) {
			return [];
		}
	},

};
