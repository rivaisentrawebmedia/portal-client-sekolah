import { convertFromSnakeCase } from "@/utils/helpers";

export const JangkaWaktuOptions = [
	"hari_ini",
	"kemarin",
	"minggu_ini",
	"bulan_ini",
	"tahun_ini",
	"7_hari",
	"30_hari",
	"minggu_lalu",
	"bulan_lalu",
]?.map((item) => {
	return {
		label: convertFromSnakeCase(item),
		value: item,
	};
});
