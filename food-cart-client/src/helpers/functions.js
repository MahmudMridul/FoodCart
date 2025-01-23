import { jwtDecode } from "jwt-decode";

export function isValidName(name) {
	// Check if the name contains only alphabets and spaces
	const hasAlphabetsAndSpaces = /^[A-Za-z\s]+$/.test(name);
	return hasAlphabetsAndSpaces;
}

export function isValidUsername(username) {
	const hasAlphabets = /[A-Za-z]/.test(username); // Check for alphabets
	return hasAlphabets && hasNumber(username) && !hasSpace(username);
}

export function isValidEmail(email) {
	// Regular expression to validate email
	const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return validEmail.test(email);
}

export function isValidPassword(password) {
	return (
		hasMinLength(password) &&
		hasUpperCase(password) &&
		hasLowerCase(password) &&
		hasNumber(password) &&
		hasSpecialChar(password)
	);
}
export function hasMinLength(str, length = 8) {
	return str.length >= length;
}

export function hasUpperCase(str) {
	return /[A-Z]/.test(str);
}

export function hasLowerCase(str) {
	return /[a-z]/.test(str);
}

export function hasNumber(str) {
	return /[0-9]/.test(str);
}

export function hasSpecialChar(str) {
	return /[^A-Za-z0-9]/.test(str);
}

export function hasSpace(str) {
	return /\s/.test(str);
}

/**
 * @param {string} method - HTTP method
 * @param {string} cred - Credentials
 * @param {object} payload - Payload
 */
function fetchOps(method, cred, payload) {
	const headers = {
		"Content-Type": "application/json",
		Accept: "application/json",
	};

	const user = JSON.parse(localStorage.getItem("user"));
	const auth = `Bearer ${user?.accessToken}`;

	if (auth && user) headers.Authorization = auth;

	const options = {
		method: method.toUpperCase(),
		headers,
	};

	if (cred) options.credentials = cred;

	if (payload) options.body = JSON.stringify(payload);

	return options;
}

/**
 * Makes an API request
 * @param {string} url - The endpoint URL
 * @param {string} method - HTTP method
 * @param {object|null} payload - Request body
 * @param {string|null} auth - Authorization header (optional)
 * @param {string|null} cred - Credentials mode (optional)
 * @returns {Promise<any>} Parsed response data
 */
export async function apiCall({ url, method, payload, cred }) {
	try {
		const options = fetchOps(method, cred, payload);
		console.log(options);
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(
				`HTTP error! status: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(`API Error: ${url}`, error);
		throw error;
	}
}

export function isTokenExpired(token) {
	if (!token) return true;
	const decoded = jwtDecode(token);
	const now = Date.now().valueOf() / 1000;
	return decoded.exp < now;
}

export function trim(str) {
	const maxCharToShow = 40;
	if (str.length > maxCharToShow) {
		return str.substring(0, maxCharToShow) + "...";
	}
	return str;
}

export function setAppMaxWidth() {
	const browserWidth = window.innerWidth;
	switch (true) {
		case browserWidth > 2100:
			return "xxl";
		case browserWidth > 1800:
			return "xl";
		case browserWidth > 1500:
			return "lg";
		case browserWidth > 1200:
			return "md";
		default:
			return "md";
	}
}
