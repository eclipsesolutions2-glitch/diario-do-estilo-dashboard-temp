import {
	Sidebar as RootSidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/core/actions/auth/session.action";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./data";
import { SidebarNavItem } from "./sidebar-nav-item";
import { SidebarNavUser } from "./sidebar-nav-user";

export function Sidebar({
	...props
}: React.ComponentProps<typeof RootSidebar>) {
	const { data: session } = useSession();
	return (
		<RootSidebar
			collapsible="icon"
			className={cn("group z-50", props.className)}
			{...props}
		>
			<SidebarHeader className="group-data-[collapsed=true]:p-4">
				<div className="flex items-center gap-2 h-12">
					<div className="relative bg-brand-700/5 dark:bg-white text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-sm">
						<img
							src="/images/diairio-do-estilo-c.webp"
							alt="Logo do diário do estilo"
							className="object-cover"
						/>
					</div>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">
							Diário do Estilo
						</span>
						<span className="truncate text-xs">Empresa</span>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent className="pt-4">
				<nav className="flex-1">
					{Object.entries(NAV_LINKS).map(([key, value]) => (
						<SidebarGroup key={key}>
							<SidebarGroupLabel className="block font-semibold first-letter:uppercase mb-2 group-data-[collapsible=icon]:mb-0">
								{key}
							</SidebarGroupLabel>
							<SidebarMenu className="space-y-1.5">
								{value.map((item) => (
									<SidebarNavItem
										key={item.label}
										icon={item.icon}
										label={item.label}
										href={item.href}
										isActive
									/>
								))}
							</SidebarMenu>
						</SidebarGroup>
					))}
				</nav>
			</SidebarContent>
			<SidebarFooter>
				{session ? (
					<SidebarNavUser
						name={session.user.name}
						email={session.user.email}
						image={session.user.avatar_url ?? ""}
					/>
				) : (
					<Skeleton className="w-full h-12 rounded-lg" />
				)}
			</SidebarFooter>
			<SidebarRail />
		</RootSidebar>
	);
}
