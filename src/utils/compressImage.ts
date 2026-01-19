export async function compressImage(
	file: File,
	options?: {
		maxWidth?: number;
		quality?: number;
	}
): Promise<File> {
	const { maxWidth = 1280, quality = 0.7 } = options || {};

	if (!file.type.startsWith("image/")) {
		return file;
	}

	const imageBitmap = await createImageBitmap(file);

	const scale = Math.min(1, maxWidth / imageBitmap.width);
	const width = imageBitmap.width * scale;
	const height = imageBitmap.height * scale;

	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;

	const ctx = canvas.getContext("2d");
	if (!ctx) return file;

	ctx.drawImage(imageBitmap, 0, 0, width, height);

	const blob: Blob | null = await new Promise((resolve) =>
		canvas.toBlob(resolve, file.type, quality)
	);

	if (!blob) return file;

	return new File([blob], file.name, {
		type: file.type,
		lastModified: Date.now(),
	});
}
