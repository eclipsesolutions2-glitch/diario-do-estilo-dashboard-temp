import Axios from "axios";
import { parseCookies } from "nookies";
import { env } from "./env";

export const axios = Axios.create({
	baseURL: `${env.VITE_PUBLIC_API_URL}/api/v1/`,
});

axios.interceptors.request.use((config) => {
	const cookies = parseCookies();
	const token = cookies["dds-auth.dashboard-session"];

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});
