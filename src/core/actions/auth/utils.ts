import type { SignInSchemaValues } from "@/core/schemas/auth/sign-in.schema";
import { axios } from "@/lib/axios";

export const sessionFn = async () => {
	return await axios.get("/auth/validate-token");
};

export const signOutFn = async () => {
	return await axios.post("/auth/logout");
};

export const signInFn = async (data: SignInSchemaValues) => {
	return await axios.post("/auth/login", {
		login: data.email,
		password: data.password,
	});
};
