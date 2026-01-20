export type Profile = {
	id: string;
	email: string;
	username: string;
	nama: string;
	photo: string | null;
	nama_sekolah: string;
	sekolah_id: string;
	photo_sekolah: string | null;
};

export type PaginatedResponse<T> = {
	data: T;
};
