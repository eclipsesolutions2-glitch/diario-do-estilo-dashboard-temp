import { ProgressProvider } from "@bprogress/react";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { NuqsAdapter } from "nuqs/adapters/tanstack-router";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NotFound } from "./notfound";

const RootLayout = () => (
	<>
		<HeadContent />
		<TooltipProvider>
			<ProgressProvider
				height="3px"
				color="#00aea2"
				options={{ showSpinner: false }}
				shallowRouting
			>
				<NuqsAdapter>
					<Outlet />
				</NuqsAdapter>
				<Toaster />
			</ProgressProvider>
		</TooltipProvider>
	</>
);
export const Route = createRootRoute({
	component: RootLayout,
	notFoundComponent: NotFound,
});
