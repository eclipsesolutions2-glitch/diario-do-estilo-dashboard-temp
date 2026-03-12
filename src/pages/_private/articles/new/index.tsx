import { createFileRoute } from "@tanstack/react-router";
import { CreateArticleForm } from "../-components/forms/create-article.form";

export const Route = createFileRoute("/_private/articles/new/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<CreateArticleForm />
			{/* <Dialog open={showModal} onOpenChange={setShowModal}>
                            <DialogTrigger asChild>
                                
                            </DialogTrigger>
                            <DialogContent className="rounded-none w-full max-w-[calc(100vw-2rem)] sm:max-w-2xl lg:max-w-4xl">
                                <DialogHeader>
                                    <DialogTitle>Criar Novo artigo</DialogTitle>
                                    <DialogDescription>
                                        Preencha os detalhes abaixo para adicionar um
                                        novo artigo ao sistema.
                                    </DialogDescription>
                                </DialogHeader>
                                
                            </DialogContent>
                        </Dialog> */}
		</div>
	);
}
