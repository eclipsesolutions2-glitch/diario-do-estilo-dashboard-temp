export function formatSlug(value: string) {
	return value
		.normalize("NFD") // separa acentos
		.replace(/[\u0300-\u036f]/g, "") // remove acentos
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "") // remove chars estranhos
		.replace(/\s+/g, "-") // espaços -> hífens
		.replace(/-+/g, "-"); // hífens duplos
}
