export function getInitials(input: string): string {
	const name = input?.toString();
	const nameParts = name?.split(" "); // Memisahkan nama berdasarkan spasi
	const initials = nameParts
		?.map((part) => part.charAt(0).toUpperCase()) // Mengambil huruf pertama dari setiap kata dan mengubahnya ke kapital
		?.join(""); // Menggabungkan inisialnya

	return initials;
}

export function convertToSlug(text = "") {
	return text
		?.toLowerCase()
		?.replace(/\s+/g, "-") // Ganti spasi dengan tanda strip
		?.replace(/[^\w\-]+/g, "") // Hapus karakter non-word dan non-stripped
		?.replace(/\-\-+/g, "-") // Ganti dua strip atau lebih dengan satu strip
		?.replace(/^-+/, "") // Hapus strip dari awal teks
		?.replace(/-+$/, ""); // Hapus strip dari akhir teks
}

export function convertSlugToText(slug = "") {
	// Ubah strip menjadi spasi dan ubah teks menjadi huruf kapital setiap kata
	const text = slug
		?.replace(/-/g, " ")
		?.replace(/\b\w/g, (char) => char.toUpperCase());

	return text;
}

export function convertToSnakeCase(text: string) {
	return text?.toLowerCase()?.replace(/\s+/g, "_");
}

export function convertFromSnakeCase(text: string) {
	if (!text) return "";
	return text
		.split("_") // pisahkan berdasarkan underscore
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // ubah huruf pertama jadi kapital
		.join(" "); // gabungkan kembali dengan spasi
}

export function formatRupiahNumber(value: number | string): string {
	if (value === null || value === undefined || value === "") return "0";

	const number = Number(value);
	if (isNaN(number)) return "0";

	return number.toLocaleString("id-ID");
}

export function toRoman(num: number): string {
	if (num < 1 || num > 3999) return "";

	const romanMap: [number, string][] = [
		[1000, "M"],
		[900, "CM"],
		[500, "D"],
		[400, "CD"],
		[100, "C"],
		[90, "XC"],
		[50, "L"],
		[40, "XL"],
		[10, "X"],
		[9, "IX"],
		[5, "V"],
		[4, "IV"],
		[1, "I"],
	];

	let result = "";
	for (const [value, roman] of romanMap) {
		while (num >= value) {
			result += roman;
			num -= value;
		}
	}
	return result;
}

export function angkaKeUrutan(num: number): string {
	if (num < 1 || num > 999) return `Ke-${num}`; // fallback jika di luar range

	if (num === 1) return "Pertama";
	if (num === 2) return "Kedua";
	if (num === 3) return "Ketiga";
	if (num === 4) return "Keempat";
	if (num === 5) return "Kelima";
	if (num === 6) return "Keenam";
	if (num === 7) return "Ketujuh";
	if (num === 8) return "Kedelapan";
	if (num === 9) return "Kesembilan";
	if (num === 10) return "Kesepuluh";
	if (num === 11) return "Kesebelas";

	const satuan = [
		"",
		"satu",
		"dua",
		"tiga",
		"empat",
		"lima",
		"enam",
		"tujuh",
		"delapan",
		"sembilan",
	];

	let hasil = "Ke";

	if (num < 20) {
		hasil += satuan[num - 10] + "belas";
	} else if (num < 100) {
		const puluh = Math.floor(num / 10);
		const sisa = num % 10;
		hasil += satuan[puluh] + "puluh";
		if (sisa > 0) hasil += " " + satuan[sisa];
	} else if (num < 1000) {
		const ratus = Math.floor(num / 100);
		const sisa = num % 100;
		hasil += satuan[ratus] + "ratus";
		if (sisa > 0) {
			const puluh = Math.floor(sisa / 10);
			const satu = sisa % 10;
			if (sisa < 10) {
				hasil += " " + satuan[sisa];
			} else if (sisa < 20) {
				hasil += " " + satuan[sisa - 10] + "belas";
			} else {
				hasil += " " + satuan[puluh] + "puluh";
				if (satu > 0) hasil += " " + satuan[satu];
			}
		}
	}

	return hasil.trim();
}

/** format number -> Rupiah */
export function formatRupiah(value: number | null | undefined) {
	if (value === null || value === undefined) return "";
	return new Intl.NumberFormat("id-ID").format(value);
}

/** parse string rupiah -> number */
export function parseRupiah(value: string) {
	const numeric = value.replace(/[^\d]/g, "");
	return numeric ? Number(numeric) : 0;
}
