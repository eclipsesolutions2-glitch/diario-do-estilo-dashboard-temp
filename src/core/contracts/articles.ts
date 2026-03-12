export interface Article {
	id: number;
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	author?: Author;
	published_by?: PublishedBy;
	is_published: boolean;
	is_featured: boolean;
	published_at?: string;
	view_count: number;
	cover_image?: string;
	is_in_newsletter: boolean;
	categories: string[];
}

interface Author {
	id: number;
	name: string;
}

interface PublishedBy {
	id: number;
	name: string;
}
