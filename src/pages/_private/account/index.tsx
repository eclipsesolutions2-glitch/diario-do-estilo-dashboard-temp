import { createFileRoute } from "@tanstack/react-router";
import { TopPageContent } from "@/components/layout/top-page-content";
import { AccountActionsCard } from "./-components/account-actions-card";
import { ProfileInfoCard } from "./-components/profile-info-card";

export const Route = createFileRoute("/_private/account/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<TopPageContent
				title="Perfil do Usuário"
				description="Gerencie suas informações pessoais e preferências"
			/>
			<ProfileInfoCard />
			<AccountActionsCard />
		</div>
	);
}
