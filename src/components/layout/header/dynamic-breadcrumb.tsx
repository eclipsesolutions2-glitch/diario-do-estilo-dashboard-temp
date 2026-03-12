"use client";

import { useLocation } from "@tanstack/react-router";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const ROUTE_TRANSLATIONS: Record<string, string> = {
	articles: "Artigos",
	categories: "Categorias",
	users: "Usuários",
	account: "Perfil",
	newsletters: "Newsletter",
};

export function DynamicBreadcrumb() {
	const { pathname } = useLocation();
	const segments = pathname.split("/").filter(Boolean);

	if (segments.length === 0) return null;

	const [route, slug] = segments;

	const routeLabel = route && (ROUTE_TRANSLATIONS[route] ?? route);
	const routeHref = `/${route}`;

	return (
		<Breadcrumb className="hidden sm:block">
			<BreadcrumbList>
				<BreadcrumbItem>
					{slug ? (
						<>
							<BreadcrumbLink href={routeHref}>
								{routeLabel}
							</BreadcrumbLink>

							<span
								aria-hidden="true"
								className="mx-2 select-none text-muted-foreground"
							>
								/
							</span>
						</>
					) : (
						<BreadcrumbPage className="text-muted-foreground">
							{routeLabel}
						</BreadcrumbPage>
					)}
				</BreadcrumbItem>

				{slug && (
					<BreadcrumbItem>
						<BreadcrumbPage className="capitalize">
							{slug}
						</BreadcrumbPage>
					</BreadcrumbItem>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
