export const StatusMenikahOptions = [
	"Sudah Menikah",
	"Belum Menikah",
	"Janda",
	"Duda",
]?.map((item) => {
	return {
		label: item,
		value: item,
	};
});
