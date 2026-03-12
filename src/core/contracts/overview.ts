export interface Overview {
	summary: Summary;
	recent_articles: RecentArticle[];
	recent_categories: RecentCategory[];
	charts: Charts;
	most_read_articles: MostReadArticle[];
}

export interface Summary {
	total_articles: number;
	published_articles: number;
	draft_articles: number;
	trashed_articles: number;
	total_categories: number;
	categories_with_articles: number;
	authors: number;
	total_users: number;
}

export interface RecentArticle {
	id: number;
	title: string;
	slug: string;
	author: string;
	status: string;
	status_color: string;
	updated_at: string;
	cover_url: string;
	edit_url: string;
	restore_url?: string;
	view_url?: string;
}

interface RecentCategory {
	id: number;
	name: string;
	slug: string;
	articles_count: number;
	creator: string;
	created_at: string;
	edit_url: string;
}

interface Charts {
	articles_per_day: ArticlesPerDay;
	articles_by_category: ArticlesByCategory[];
	status_distribution: StatusDistribution;
}

interface ArticlesPerDay {
	labels: string[];
	created: number[];
	read: number[];
}

interface ArticlesByCategory {
	label: string;
	value: number;
}

interface StatusDistribution {
	published: number;
	draft: number;
	trashed: number;
}

interface MostReadArticle {
	id: number;
	title: string;
	slug: string;
	author: string;
	views: number;
	published_at: string;
	cover_url: string;
	view_url: string;
}
