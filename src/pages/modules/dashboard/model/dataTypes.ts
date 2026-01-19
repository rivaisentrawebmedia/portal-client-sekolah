export type Dashboard = {
	total_client: number;
	provinsi: {
		id: string;
		nama: string;
		total: number;
	}[];
	pendidikan: {
		id: string;
		nama: string;
		total: number;
	}[];
	jumlah_aset: number;
};

export type PaginatedResponse<T> = {
	data: T;
};
