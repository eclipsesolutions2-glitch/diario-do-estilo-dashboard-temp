import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { normalizeArticleContent } from "@/lib/formats/normalize-article-content";

export function ArticleRenderContent({ content }: { content: string }) {
	return (
		<div className="prose prose-sm sm:prose-base lg:prose-lg max-w-full text-foreground wrap-break-word">
			<ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
				{normalizeArticleContent(content)}
			</ReactMarkdown>
		</div>
	);
}
