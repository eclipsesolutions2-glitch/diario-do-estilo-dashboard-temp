import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/lib/protected-auth";
import { SignInForm } from "./-components/sign-in.form";

export const Route = createFileRoute("/_auth/sign-in")({
	beforeLoad: () => {
		if (isAuthenticated()) {
			throw redirect({ to: "/" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="h-screen flex flex-col gap-6 md:flex-row-reverse">
			<div className="h-60 md:h-full md:w-1/2 p-4">
				<div className="relative w-full h-full overflow-hidden rounded-none">
					<img
						src="/images/background-01.jpg"
						alt="background banner 01"
						className="w-full h-full object-cover bg-brand-900/30"
					/>
				</div>
			</div>

			<div className="flex-1 flex md:items-center justify-center px-4">
				<div className="flex flex-col gap-6 max-w-md w-full">
					<div>
						<h1 className="text-2xl font-bold mb-2">
							Bem-vindo de volta 👋
						</h1>
						<p className="text-muted-foreground dark:text-muted">
							Faça login para começar a gerenciar o teu site.
						</p>
					</div>
					<SignInForm />
				</div>
			</div>
		</main>
	);
}
