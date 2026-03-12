import { useQuerySubscribers } from "@/core/actions/newsletter/query-subscribers-newsletter";
import { SkeletonTable } from "./tables/skeleton-table";
import { TableListNewsletterSubscribers } from "./tables/subscribers";

export function NewsLetterSubscribers() {
	const { data, isPending } = useQuerySubscribers();

	if (isPending) {
		return <SkeletonTable />;
	}

	return (
		<section className="space-y-4">
			<h3 className="text-xl font-bold">Subscritores</h3>
			<TableListNewsletterSubscribers data={data.data} />
		</section>
	);
}
