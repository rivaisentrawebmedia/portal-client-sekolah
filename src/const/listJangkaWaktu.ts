import { convertToSnakeCase } from "@/utils/helpers";

export const JangkaWaktuOptions = ["Hari Ini", "Bulan Ini"]?.map((item) => {
	return {
		label: item,
		value: convertToSnakeCase(item),
	};
});
