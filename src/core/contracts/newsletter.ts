export interface Subscriber {
	id: number;
	email: string;
	name: string;
	is_subscribed: true;
	subscribed_at: string;
	unsubscribed_at?: string;
	created_at: string;
	updated_at: string;
}

export interface HistorySentArticleItem {
	id: number;
	article_id: number;
	user_id: number;
	sent_at: string;
	created_at: string;
	updated_at: string;
	article?: {
		id: number;
		title: string;
	};
	sender: {
		id: number;
		name: string;
		email: string;
	};
}
