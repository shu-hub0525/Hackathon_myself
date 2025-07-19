export interface User {
	id: number;
	name: string;
	age: number;
}

export interface UserForm {
	name: string;
	age: number;
}

export interface FormErrors {
	name?: string;
	age?: string;
} 