type PDFPreviewProps = {
	pdfUrl: string | null;
};

export default function PDFPreview({ pdfUrl }: PDFPreviewProps) {
	return (
		<div className="flex h-full w-full flex-col overflow-hidden rounded-lg border bg-white">
			{pdfUrl ? (
				<iframe
					title="PDF Preview"
					src={pdfUrl}
					className="h-full w-full flex-1"
				/>
			) : (
				<div className="flex flex-1 items-center justify-center">
					<p className="text-sm text-slate-500">Memuat preview PDF…</p>
				</div>
			)}
		</div>
	);
}
