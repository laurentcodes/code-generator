import axios from 'axios';
import { toast } from 'sonner';

import { getCookie } from './cookies';

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor
instance.interceptors.request.use(
	(config) => {
		const token = getCookie('token');

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor
instance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (typeof error.response.data === 'string') {
			toast.error(error.response.data);
			return Promise.reject(error);
		}

		if (error.response.status === 401) {
			toast.error('Unauthorized! Please login again.');

			window.location.reload();

			return Promise.reject(error);
		}

		toast.error(error.response.data.message);

		return Promise.reject(error);
	}
);

export default instance;
