import DOMPurify from "dompurify";
import { cn } from "./cn";

export function HtmlPreview({
	html,
	className,
}: {
	html?: string;
	className?: string;
}) {
	if (!html) return null;

	const cleanHtml = DOMPurify.sanitize(html, {
		USE_PROFILES: { html: true },
	});

	return (
		<div
			className={cn("prose prose-sm max-w-none", className)}
			dangerouslySetInnerHTML={{ __html: cleanHtml }}
		/>
	);
}
