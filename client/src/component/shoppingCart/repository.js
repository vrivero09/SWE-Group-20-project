import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export function getProducts() {
	return axios.get(`${BASE_URL}/api/products`)
		.then(response => response.data);
}

export function getCartProducts(cart) {
	return axios.post(`${BASE_URL}/api/products`, {cart})
		.then(response => response.data);
}

export function login (data) {
	return axios.post(`${BASE_URL}/api/auth`, { name: data.name, password: data.password })
		.then(response => {
			localStorage.setItem('x-access-token', response.data.token);
			localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
			return response.data
		})
		.catch(err => Promise.reject('Authentication Failed!'));
}

export function isAuthenticated(){
	return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now()
}
