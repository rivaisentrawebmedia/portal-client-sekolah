import { convertFromSnakeCase } from "@/utils/helpers";

export const StatusPresensiOptions = [
	"hadir",
	"hadir_libur",
	"terlambat",
	"pulang_awal",
	"sakit",
	"izin",
	"alpha",
	"cuti",
]?.map((item) => {
	return {
		label: convertFromSnakeCase(item),
		value: item,
	};
});
