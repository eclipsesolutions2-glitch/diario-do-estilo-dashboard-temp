import { Newspaper } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { usePublishInNewsletterArticle } from "@/core/actions/article/publish-in-newsletter-article";

interface PublishedInNewsletterMoreActionProps {
	slug: string;
	in_newsletter: boolean;
}

export function PublishedInNewsletterMoreAction({
	slug,
	in_newsletter,
}: PublishedInNewsletterMoreActionProps) {
	const [showModal, setShowModal] = useState(false);
	const { mutateAsync: onPublishInNewsletterFn, isPending } =
		usePublishInNewsletterArticle();
	const handlePublish = async () => {
		if (in_newsletter) {
			toast.success("Artigo já está na newsletter");
			return;
		}

		onPublishInNewsletterFn(slug, {
			onSuccess() {
				toast.success("Artigo publicado na newsletter");
			},
			onError() {
				toast.error("Falha ao tenta publicar artigo na newsletter");
			},
		});
	};
	return (
		<AlertDialog open={showModal} onOpenChange={setShowModal}>
			<AlertDialogTrigger asChild>
				<DropdownMenuItem
					onSelect={(e) => e.preventDefault()}
					disabled={in_newsletter}
					className="rounded-none gap-2"
				>
					<Newspaper className="h-4 w-4" />
					<span>
						{in_newsletter
							? "Já na newsletter"
							: "Publicar na newsletter"}
					</span>
				</DropdownMenuItem>
			</AlertDialogTrigger>

			<AlertDialogContent className="rounded-none">
				<AlertDialogHeader>
					<AlertDialogTitle>
						Confirmar publicação na newsletter
					</AlertDialogTitle>

					<AlertDialogDescription>
						O artigo será enviado para a newsletter e ficará visível
						para todos os subscritores.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel className="rounded-none">
						Cancelar
					</AlertDialogCancel>

					<AlertDialogAction
						onClick={handlePublish}
						disabled={isPending}
						className="rounded-none"
					>
						{isPending ? "A publicar..." : "Publicar"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
