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
