export interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	_id: string;
}

export interface LoggedInUser {
	email: string;
	token: string;
	_id: string;
}

export interface Category {
	name: string;
	_id: string;
}

export interface Poi {
	name: string;
	category: Category;
    description: string;
    latitude: number;
    longitude: number;
	_id: string;
}