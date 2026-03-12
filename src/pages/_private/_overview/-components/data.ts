import {
	FileCheck,
	FileEdit,
	FileText,
	Folder,
	FolderOpen,
	Trash2,
	UserCheck,
	Users,
} from "lucide-react";
import type { Summary } from "@/core/contracts/overview";

type Overview = Array<{
	id: string;
	icon: React.ElementType;
	title: string;
	description: string;
	totalsKey: keyof Summary;
}>;

export const OVERVIEW_CARD_ITEMS: Overview = [
	{
		id: "1",
		icon: FileText,
		title: "Artigos Totais",
		description: "Quantidade total de artigos cadastrados.",
		totalsKey: "total_articles",
	},
	{
		id: "2",
		icon: FileCheck,
		title: "Artigos Publicados",
		description: "Número de artigos que já estão publicados.",
		totalsKey: "published_articles",
	},
	{
		id: "3",
		icon: FileEdit,
		title: "Rascunhos",
		description: "Total de artigos salvos como rascunho.",
		totalsKey: "draft_articles",
	},
	{
		id: "4",
		icon: Trash2,
		title: "Lixeira",
		description: "Quantidade de artigos descartados.",
		totalsKey: "trashed_articles",
	},
	{
		id: "5",
		icon: Folder,
		title: "Categorias Totais",
		description: "Número total de categorias cadastradas.",
		totalsKey: "total_categories",
	},
	{
		id: "6",
		icon: FolderOpen,
		title: "Categorias com Artigos",
		description: "Categorias que possuem ao menos um artigo.",
		totalsKey: "categories_with_articles",
	},
	{
		id: "7",
		icon: UserCheck,
		title: "Autores",
		description: "Total de autores registados no sistema.",
		totalsKey: "authors",
	},
	{
		id: "8",
		icon: Users,
		title: "Usuários",
		description: "Quantidade total de usuários no sistema.",
		totalsKey: "total_users",
	},
];
