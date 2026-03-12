import type { UpdateProfileSchemaValues } from "@/core/schemas/users/profile.schema";
import type { RegisterUserSchemaValues } from "@/core/schemas/users/register-user.schema";
import type { UpdateUserSchemaValues } from "@/core/schemas/users/update-user.schema";
import { axios } from "@/lib/axios";

export const findManyUsersFn = async () => {
	return await axios.get("/auth/users");
};

export const createUserFn = async (data: RegisterUserSchemaValues) => {
	return await axios.post("/auth/users", {
		name: data.name,
		username: data.username,
		email: data.email,
		password: data.password,
		password_confirmation: data.passwordConfirmation,
		role: data.role,
	});
};

export const restoreUserFn = async (id: number) => {
	return await axios.post(`/auth/users/${id}/restore`);
};

export const inactiveUserFn = async (id: number) => {
	return await axios.delete(`/auth/users/${id}`);
};

export const updateUserFn = async (
	data: UpdateUserSchemaValues & { id: number },
) => {
	return await axios.put(`/auth/users/${data.id}`, {
		name: data.name,
		username: data.username,
		email: data.email,
		role: data.role,
		password: data.password,
		password_confirmation: data.passwordConfirmation,
	});
};

export const updateProfileUserFn = async (data: UpdateProfileSchemaValues) => {
	return await axios.put("/auth/profile", {
		name: data.name,
		username: data.username,
		email: data.email,
		bio: data.bio,
	});
};
