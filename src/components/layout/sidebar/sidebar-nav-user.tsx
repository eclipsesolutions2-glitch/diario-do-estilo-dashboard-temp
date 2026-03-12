import { Link } from "@tanstack/react-router";
import { BadgeCheck, ChevronsUpDown, Headset, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useSignOut } from "@/core/actions/auth/sign-out.action";
import { getAvatarFallback } from "@/lib/formats/format-avatar-fallback";

interface SidebarNavUserProps {
	name: string;
	email: string;
	image: string;
}

export function SidebarNavUser({ name, email, image }: SidebarNavUserProps) {
	const { isMobile } = useSidebar();
	const { mutateAsync } = useSignOut();
	const avatarFallback = getAvatarFallback(name);
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							asChild
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-none"
						>
							<div>
								<Avatar className="h-9 w-9 rounded-none">
									<AvatarImage src={image} alt={name} />
									<AvatarFallback className="rounded-none">
										{avatarFallback}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{name}
									</span>
									<span className="truncate text-xs">
										{email}
									</span>
								</div>
								<ChevronsUpDown className="ml-auto size-4" />
							</div>
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-none"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={16}
						alignOffset={24}
					>
						<DropdownMenuLabel>
							<span className="p-0 font-normal flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{name}
									</span>
									<span className="truncate text-xs text-muted-foreground">
										{email}
									</span>
								</div>
							</span>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<a
								href="https://eclipsesolutions.ao/contacts"
								target="_blank"
								rel="noopener noreferrer"
							>
								<DropdownMenuItem className="rounded-none py-2">
									<Headset />
									Suporte Técnico
								</DropdownMenuItem>
							</a>
						</DropdownMenuGroup>
						<DropdownMenuGroup>
							<Link to="/account">
								<DropdownMenuItem className="rounded-none py-2">
									<BadgeCheck />
									Meu perfil
								</DropdownMenuItem>
							</Link>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => mutateAsync()}
							className="rounded-none"
						>
							<LogOut />
							Terminar Sessão
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
