export type UploadFileResponse = {
	data: {
		url: string;
		size: number;
	};
};

export type Menu = {
	id: string;
	photo: string | null;
	slug: string;
	urutan: number;
	nama: string;
	modul_id: string;
	modul: string;
	baca: boolean;
	tulis: boolean;
	ubah: boolean;
	hapus: boolean;
	children: Menu[] | null;
};

export type PaginatedResponse<T> = {
	data: T[];
};
