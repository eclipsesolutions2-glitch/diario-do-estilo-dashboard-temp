import {
	FileText,
	Home,
	LayoutGrid,
	Newspaper,
	UserSquare,
	Users2,
} from "lucide-react";

export const NAV_LINKS = {
	geral: [
		{
			label: "Overview",
			href: "/",
			icon: Home,
		},
		{
			label: "Artigos",
			href: "/articles",
			icon: FileText,
		},
		{
			label: "Categorias",
			href: "/categories",
			icon: LayoutGrid,
		},
		{
			label: "Usuários",
			href: "/users",
			icon: Users2,
		},
	],
	admin: [
		{
			label: "Newsletter",
			href: "/newsletters",
			icon: Newspaper,
		},
		{
			label: "Perfil",
			href: "/account",
			icon: UserSquare,
		},
	],
};
