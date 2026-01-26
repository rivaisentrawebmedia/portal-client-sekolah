export type DaftarLokasi = {
	id: string;
	nama: string;
	longtitude: number;
	latitude: number;
	radius: number;
};

export type UpdatePayload = {
	id: string;
	data: any;
};
