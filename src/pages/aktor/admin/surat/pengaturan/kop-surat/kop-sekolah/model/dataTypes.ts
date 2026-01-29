export type KopSurat = {
	id: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	logo: string | null;
	isi_1: string;
	jenis_font_1: string; // Roboto
	gaya_font_1: string; // Normal | Bold | Italic
	ukuran_font_1: string;
	isi_2: string;
	jenis_font_2: string;
	gaya_font_2: string;
	ukuran_font_2: string;
	isi_3: string;
	jenis_font_3: string;
	gaya_font_3: string;
	ukuran_font_3: string;
	isi_4: string;
	jenis_font_4: string;
	gaya_font_4: string;
	ukuran_font_4: string;
	isi_5: string;
	jenis_font_5: string;
	gaya_font_5: string;
	ukuran_font_5: string;
	isi_6: string;
	jenis_font_6: string;
	gaya_font_6: string;
	ukuran_font_6: string;
	logo_base64: string;
};

export type UpdatePayload = {
	id: string;
	data: any;
};
