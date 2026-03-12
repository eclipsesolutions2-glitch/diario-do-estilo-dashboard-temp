import type { Subscriber } from "@/core/contracts/newsletter";

interface SubscriberCardProps {
	data: Subscriber;
}

export function SubscriberCard({ data }: SubscriberCardProps) {
	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
