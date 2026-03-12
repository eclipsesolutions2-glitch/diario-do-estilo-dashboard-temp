interface TopPageContentProps {
	title: string;
	description?: string;
}

export function TopPageContent({ title, description }: TopPageContentProps) {
	return (
		<div className="mb-8">
			<h1 className="text-4xl font-serif font-bold text-foreground mb-2">
				{title}
			</h1>
			{description && (
				<p className="text-muted-foreground font-light">
					{description}
				</p>
			)}
		</div>
	);
}
