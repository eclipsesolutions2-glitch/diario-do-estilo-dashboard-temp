import { createFileRoute } from "@tanstack/react-router";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { TopPageContent } from "@/components/layout/top-page-content";
import { useQueryUsers } from "@/core/actions/users/query-many-users";
import { TableListUser } from "./-components/table";

export const Route = createFileRoute("/_private/users/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data, isPending } = useQueryUsers();
	return (
		<div>
			<TopPageContent
				title="Usuários"
				description="Gerencie os usuários cadastrados na plataforma"
			/>

			{isPending ? (
				<LoadingScreen />
			) : (
				<TableListUser data={data.users} />
			)}
		</div>
	);
}
