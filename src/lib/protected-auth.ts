export const TOKEN_NAME = "dds-auth.dashboard-session";

export function getAuthToken() {
	if (typeof document === "undefined") return null;

	const match = document.cookie
		.split("; ")
		.find((row) => row.startsWith(`${TOKEN_NAME}=`));

	return match?.split("=")[1] ?? null;
}

export function isAuthenticated() {
	return !!getAuthToken();
}
