import type React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface OverviewCardRootProps {
	children: React.ReactNode;
}

export function OverviewCardRoot({ children }: OverviewCardRootProps) {
	return (
		<Card className="p-4 shadow-none rounded-none">
			<CardContent className="flex gap-4 p-0">{children}</CardContent>
		</Card>
	);
}
