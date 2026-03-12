import { createFileRoute } from "@tanstack/react-router";
import { NewsletterArticleHistory } from "./-components/newsletter-article-history";
import { NewsLetterStats } from "./-components/newsletter-stats";
import { NewsLetterSubscribers } from "./-components/newsletter-subscribers";

export const Route = createFileRoute("/_private/newsletters/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="space-y-4">
			<NewsLetterStats />
			<NewsLetterSubscribers />
			<NewsletterArticleHistory />
		</div>
	);
}
