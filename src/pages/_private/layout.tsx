import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { isAuthenticated } from "@/lib/protected-auth";

export const Route = createFileRoute("/_private")({
	beforeLoad: ({ location }) => {
		if (!isAuthenticated()) {
			throw redirect({
				to: "/sign-in",
				search: {
					redirect: location.pathname,
				},
			});
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<div className="flex min-h-screen w-full">
				<Sidebar />

				<div className="flex flex-1 flex-col">
					<Header />

					<main className="flex-1 overflow-hidden">
						<SidebarInset className="p-4 h-full">
							<div className="h-full overflow-y-auto">
								<Outlet />
							</div>
						</SidebarInset>
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
