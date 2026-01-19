export type SidebarItem = {
	label: string;
	icon?: React.ElementType;
	children?: { label: string }[];
};

export const sidebarItems: SidebarItem[] = [
	{
		label: "Dashboard",
	},
	{
		label: "Identitas",
	},
	{
		label: "Manajemen User",
		children: [
			{ label: "Daftar User" },
			{ label: "Role/Level" },
			{ label: "Recovery" },
		],
	},
	{
		label: "Manajemen Client",
		children: [
			{
				label: "Daftar Client",
			},
			{
				label: "Logins As",
			},

			{
				label: "Aset Client",
			},
			{
				label: "Sektor Bisnis",
			},
			{
				label: "Industri",
			},
			{
				label: "Recovery",
			},
		],
	},
	{
		label: "Wilayah",
		children: [
			{
				label: "Provinsi",
			},
			{
				label: "Kabupaten/Kota",
			},
			{
				label: "Kecamatan",
			},
			{
				label: "Kelurahan/Desa",
			},
			{ label: "Recovery" },
		],
	},
	{
		label: "Aset",
		children: [
			{
				label: "Modul",
			},
			{
				label: "Kategori",
			},
			{ label: "Recovery" },
		],
	},
	{
		label: "Referensi",
		children: [
			{
				label: "Jenis Kepegawaian",
			},
			{
				label: "Kategori Kepegawaian",
			},
			{
				label: "Jenis KTK",
			},
			{
				label: "Pangkat/Golongan",
			},
			{
				label: "Status Aktif",
			},
			{
				label: "Suku",
			},
			{
				label: "Agama",
			},
			{
				label: "Golongan Darah",
			},
			{
				label: "Akreditasi",
			},
			{
				label: "Penyelenggaraan Operasional",
			},
		],
	},
];
