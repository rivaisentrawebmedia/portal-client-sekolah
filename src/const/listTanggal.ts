export const getTanggalOptions = () => {
	return Array.from({ length: 31 }, (_, i) => {
		const day = i + 1;
		return {
			label: day.toString(),
			value: day.toString().padStart(2, "0"),
		};
	});
};

const BULAN = [
	"Januari",
	"Februari",
	"Maret",
	"April",
	"Mei",
	"Juni",
	"Juli",
	"Agustus",
	"September",
	"Oktober",
	"November",
	"Desember",
];

export const getBulanOptions = () => {
	return BULAN.map((nama, idx) => ({
		label: nama,
		value: String(idx + 1).padStart(2, "0"),
	}));
};

export const getTahunOptions = () => {
	const currentYear = new Date().getFullYear();

	return Array.from({ length: 90 }, (_, i) => {
		const year = currentYear - i;
		return {
			label: year.toString(),
			value: year.toString(),
		};
	});
};
