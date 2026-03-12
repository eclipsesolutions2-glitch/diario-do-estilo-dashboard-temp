import { Link } from "@tanstack/react-router";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface SidebarNavItemProps {
	label: string;
	href: string;
	icon?: React.ElementType;
	isActive: boolean;
}

export function SidebarNavItem({
	isActive = true,
	...data
}: SidebarNavItemProps) {
	return (
		<SidebarMenuItem>
			<Link to={data.href} className="data-[state=open]:p-4">
				<SidebarMenuButton
					tooltip={data.label}
					disabled={!isActive}
					className="rounded-none"
				>
					{data.icon && <data.icon />}
					<span>{data.label}</span>
				</SidebarMenuButton>
			</Link>
		</SidebarMenuItem>
	);
}
