export type Galeri = {
	id: string;
	created_at: string;
	gambar: string;
};

export type PaginatedResponse<T> = {
	data: T[];
};
