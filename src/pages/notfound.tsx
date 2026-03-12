import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
	return (
		<main className="flex items-center justify-center px-6 py-20">
			<div className="w-full max-w-2xl text-center">
				<p className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-6">
					Erro 404
				</p>

				<h1 className="font-serif text-3xl sm:text-5xl md:text-6xl leading-tight sm:leading-[0.95] tracking-tight mb-8">
					Esta página
					<br />
					não faz parte
					<br />
					desta edição
				</h1>

				<p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-10 sm:mb-12 max-w-xl mx-auto">
					Assim como numa revista, nem todo conteúdo chega à
					publicação final. A página que procura não existe ou foi
					arquivada.
				</p>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
					<Link to="/" className="w-full sm:w-auto">
						<Button
							type="button"
							variant="secondary"
							className="w-full sm:w-auto rounded-none uppercase tracking-widest text-xs sm:text-sm px-8 py-4"
						>
							Voltar o ínicio
						</Button>
					</Link>

					<Link to="/sign-in" className="w-full sm:w-auto">
						<Button
							type="button"
							variant="outline"
							className="w-full sm:w-auto rounded-none uppercase tracking-widest text-xs sm:text-sm px-8 py-4"
						>
							Fazer Login
						</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}
