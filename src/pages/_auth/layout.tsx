import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/lib/protected-auth";

const publicRoutes = [
	{ path: "/sign-in", whenAuthenticated: "redirect" },
	{ path: "/forgot", whenAuthenticated: "next" },
	{ path: "/images", whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_AUTHENTICATED_ROUTE = "/";

export const Route = createFileRoute("/_auth")({
	beforeLoad: ({ location }) => {
		const route = publicRoutes.find((r) => r.path === location.pathname);

		if (isAuthenticated() && route?.whenAuthenticated === "redirect") {
			throw redirect({
				to: REDIRECT_WHEN_AUTHENTICATED_ROUTE,
			});
		}
	},
	component: Outlet,
});
