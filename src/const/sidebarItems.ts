import { JokoAccountTree } from "@/assets/icons/JokoAccountTree";
import { JokoBusiness } from "@/assets/icons/JokoBusiness";
import { JokoDashboard } from "@/assets/icons/JokoDashboard";
import { JokoHeadsetMic } from "@/assets/icons/JokoHeadsetMic";
import { JokoHelpCenter } from "@/assets/icons/JokoHelpCenter";
import { JokoListAlt } from "@/assets/icons/JokoListAlt";
import { JokoMenuBook } from "@/assets/icons/JokoMenuBook";
import { JokoPeople } from "@/assets/icons/JokoPeople";

export type SidebarItem = {
	label: string;
	icon?: React.ElementType;
	children?: { label: string }[];
};

export const sidebarItems: SidebarItem[] = [
	{
		label: "Dashboard",
		icon: JokoDashboard,
	},
	{
		label: "Manajemen User",
		icon: JokoPeople,
	},
	{
		label: "Struktur Organisasi",
		icon: JokoAccountTree,
	},
	{
		label: "Log Aktivitas",
		icon: JokoListAlt,
	},
	{
		label: "Profil Organisasi",
		icon: JokoBusiness,
	},
	{
		label: "Hubungi Kami",
		icon: JokoHeadsetMic,
		children: [
			{
				label: "F.A.Q Pusat",
			},
			{
				label: "Ajukan Pertanyaan",
			},
		],
	},
	{
		label: "Pusat Bantuan",
		icon: JokoHelpCenter,
	},
	{
		label: "Dokumentasi",
		icon: JokoMenuBook,
	},
];
