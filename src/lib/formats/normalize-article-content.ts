export function normalizeArticleContent(raw: string) {
	if (!raw) return "";

	return (
		raw
			// Normaliza quebras de linha
			.replace(/\r\n/g, "\n")
			// Normaliza múltiplas quebras (máximo 2)
			.replace(/\n{3,}/g, "\n\n")
			// Remove espaços extras no fim das linhas
			.replace(/[ \t]+$/gm, "")
			.trim()
	);
}