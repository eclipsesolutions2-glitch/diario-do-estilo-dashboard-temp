import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DynamicBreadcrumb } from "./dynamic-breadcrumb";

export function Header() {
	return (
		<header className="sticky top-0 left-0 z-20 w-full h-16 shrink-0 flex items-center justify-between px-4 border-b bg-background/70 backdrop-blur-sm transition-[width,height] ease-linear group-data-[collapsed=true]/sidebar-wrapper:h-12">
			<div className="flex items-center gap-3">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="data-[orientation=vertical]:h-4 rotate-30"
				/>
				<DynamicBreadcrumb />
			</div>
			<div className="flex items-center gap-3">
				{/* <NotificationPopover /> */}

				<Button
					type="button"
					onClick={() => {
						window.open("https://diariodoestilo.com", "_blank");
					}}
				>
					<Globe className="h-4 w-4" />
					<span>Ir para o site</span>
				</Button>
			</div>
		</header>
	);
}
