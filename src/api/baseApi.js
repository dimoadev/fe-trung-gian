import axios from 'axios';
import queryString from 'query-string';
const API_URL = import.meta.env.VITE_API_URL;
const AppAPIInstance = axios.create({
	baseURL: API_URL || 'http://localhost:3001/api/',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
	paramsSerializer: (params) => queryString.stringify(params),
});

AppAPIInstance.interceptors.request.use(async (config) => {
	const accessToken = localStorage.getItem('token');
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
		config.headers['x-access-token'] = `${accessToken}`;
	}
	return config;
});

AppAPIInstance.interceptors.response.use(
	(response) => {
		return response.data?.result ?? (response.data || null);
	},
	async (error) => {

		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = localStorage.getItem('refresh_token');
			try {
				const newToken = await axios.post(`${API_URL}auth/refresh-token`, {
					refreshToken,
				});
				localStorage.setItem('token', newToken.data.accessToken);
				localStorage.setItem('refresh_token', newToken.data.refreshToken);
				originalRequest.headers[
					'Authorization'
				] = `Bearer ${newToken.data.accessToken}`;
				return axios(originalRequest);
			} catch (refreshError) {
				window.location.replace('/auth/login');
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default AppAPIInstance;
