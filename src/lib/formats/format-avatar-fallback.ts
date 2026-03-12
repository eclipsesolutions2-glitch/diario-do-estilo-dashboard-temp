export function getAvatarFallback(name?: string): string {
	if (!name) return "";

	const parts = name.trim().split(/\s+/).filter(Boolean);

	if (parts.length === 1) {
		return parts[0].slice(0, 2).toUpperCase();
	}

	if (parts.length === 2) {
		return (parts[0][0] + parts[1][0]).toUpperCase();
	}

	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
