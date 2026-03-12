import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/core/actions/auth/session.action";
import { AvatarUploader } from "./avatar-uploader";
import { ProfileInfoForm } from "./profile-info.from";

export function ProfileInfoCard() {
	const { data, isPending } = useSession();

	return (
		<Card className="shadow-none rounded-none">
			<CardHeader>
				<CardTitle>Informações Pessoais</CardTitle>
				<CardDescription>
					Atualize suas informações básicas de perfil
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				{isPending ? (
					<>
						<div>
							<Skeleton className="size-10 rounded-full" />
							<div className="flex flex-col gap-2">
								<Skeleton className="w-full h-4 rounded-md" />
								<Skeleton className="w-full h-4 rounded-md" />
							</div>
						</div>

						<div>
							<div className="grid grid-cols-2 gap-4">
								<Skeleton className="w-full h-4 rounded-md" />
								<Skeleton className="w-full h-4 rounded-md" />
								<Skeleton className="w-full h-4 rounded-md" />
								<Skeleton className="w-full h-4 rounded-md" />
							</div>

							<Skeleton className="w-1/3 h-4 rounded-md" />
						</div>
					</>
				) : (
					<>
						<AvatarUploader
							data={{
								name: data.user.name,
								image: data.user.avatar_url,
							}}
						/>
						<ProfileInfoForm
							defaultValues={{
								name: data.user.name,
								email: data.user.email,
								username: data.user.username,
								bio: data.user.bio,
							}}
						/>
					</>
				)}
			</CardContent>
		</Card>
	);
}
