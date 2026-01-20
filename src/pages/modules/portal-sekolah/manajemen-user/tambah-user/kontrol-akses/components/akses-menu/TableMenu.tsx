import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState, type JSX } from "react";
import type { KontrolAksesMenu } from "../../../../list-user/model";
import { usePostToggleMenu } from "../../../../list-user/controller";
import { FaCaretDown } from "react-icons/fa";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

type AksesKey = "baca" | "tulis" | "ubah" | "hapus";

/* =========================
   🔧 CORE LOGIC (WAJIB)
========================= */
function applyAccessToTree(
	menu: KontrolAksesMenu,
	key: AksesKey,
	value: boolean,
): KontrolAksesMenu {
	return {
		...menu,
		[key]: value,
		children: menu.children
			? menu.children.map((c) => applyAccessToTree(c, key, value))
			: null,
	};
}

function updateMenuTree(
	menus: KontrolAksesMenu[],
	targetId: string,
	key: AksesKey,
	value: boolean,
): KontrolAksesMenu[] {
	return menus.map((menu) => {
		if (menu.id === targetId) {
			return applyAccessToTree(menu, key, value);
		}

		if (menu.children) {
			return {
				...menu,
				children: updateMenuTree(menu.children, targetId, key, value),
			};
		}

		return menu;
	});
}

/* =========================
   🧠 COMPONENT
========================= */
interface TableMenuProps {
	data: KontrolAksesMenu[];
	loading: boolean;
}

export function TableMenu({ data, loading }: TableMenuProps) {
	const [menuState, setMenuState] = useState<KontrolAksesMenu[]>([]);
	const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
	const { toggleMenuAkses, isLoading } = usePostToggleMenu();

	/* Init state */
	useEffect(() => {
		setMenuState(data);

		const map: Record<string, boolean> = {};
		const walk = (menus: KontrolAksesMenu[]) => {
			menus.forEach((m) => {
				map[m.id] = true;
				if (m.children) walk(m.children);
			});
		};
		walk(data);
		setOpenMap(map);
	}, [data]);

	const toggleOpen = (id: string) => {
		setOpenMap((p) => ({ ...p, [id]: !p[id] }));
	};

	/* ⬅️ CHECKBOX HANDLER (LOCAL STATE ONLY) */
	const handleToggle = (id: string, key: AksesKey, value: boolean) => {
		setMenuState((prev) => updateMenuTree(prev, id, key, value));
	};

	/* ⬅️ SAVE BUTTON (HIT API SEKALI) */
	const handleSave = () => {
		toggleMenuAkses(menuState);
	};

	return (
		<>
			<Table className="w-full border">
				<TableHeader className="bg-[#021A00]">
					<TableRow>
						<TableHead className="text-white">Menu</TableHead>
						<TableHead className="text-center text-white">Baca</TableHead>
						<TableHead className="text-center text-white">Tulis</TableHead>
						<TableHead className="text-center text-white">Ubah</TableHead>
						<TableHead className="text-center text-white">Hapus</TableHead>
						<TableHead className="w-[50px]" />
					</TableRow>
				</TableHeader>

				<TableBody>
					{loading &&
						Array.from({ length: 4 }).map((_, i) => (
							<TableRow key={i}>
								<TableCell colSpan={6}>
									<Skeleton className="h-6 w-full" />
								</TableCell>
							</TableRow>
						))}

					{!loading && menuState.length === 0 && (
						<TableRow>
							<TableCell colSpan={6} className="p-0">
								<Empty className="border-0 rounded-none">
									<EmptyHeader>
										<EmptyTitle>Belum ada data menu</EmptyTitle>
										<EmptyDescription>
											Silakan tambahkan data menu terlebih dahulu
										</EmptyDescription>
									</EmptyHeader>
								</Empty>
							</TableCell>
						</TableRow>
					)}

					{menuState.map((menu) =>
						renderRow(menu, 0, openMap, toggleOpen, handleToggle),
					)}
				</TableBody>
			</Table>

			<div className="flex justify-end mt-4">
				<Button onClick={handleSave} disabled={isLoading}>
					<Save className="mr-2 h-4 w-4" />
					Simpan Data Client
				</Button>
			</div>
		</>
	);
}

/* =========================
   🔁 RENDER ROW RECURSIVE
========================= */
function renderRow(
	menu: KontrolAksesMenu,
	level: number,
	openMap: Record<string, boolean>,
	toggleOpen: (id: string) => void,
	onToggle: (id: string, key: AksesKey, value: boolean) => void,
): JSX.Element[] {
	const rows: JSX.Element[] = [];

	rows.push(
		<TableRow key={menu.id} className="bg-[#F6FFF5]">
			<TableCell style={{ paddingLeft: level * 24 + 12 }}>
				{menu.nama}
			</TableCell>

			{(["baca", "tulis", "ubah", "hapus"] as AksesKey[]).map((key) => (
				<TableCell key={key} className="text-center">
					<input
						type="checkbox"
						checked={menu[key]}
						onChange={(e) => onToggle(menu.id, key, e.target.checked)}
						className="
							w-4 h-4
							appearance-none
							rounded
							border border-gray-400
							bg-white
							checked:bg-[#1E5916]
							checked:border-[#1E5916]
							checked:after:content-['✔']
							checked:after:text-white
							checked:after:text-xs
							checked:after:flex
							checked:after:items-center
							checked:after:justify-center
						"
					/>
				</TableCell>
			))}

			<TableCell className="text-center">
				{menu.children && menu.children.length > 0 && (
					<button onClick={() => toggleOpen(menu.id)}>
						<FaCaretDown
							className={`transition-transform ${
								openMap[menu.id] ? "rotate-180" : ""
							}`}
						/>
					</button>
				)}
			</TableCell>
		</TableRow>,
	);

	if (openMap[menu.id] && menu.children) {
		menu.children.forEach((child) => {
			rows.push(...renderRow(child, level + 1, openMap, toggleOpen, onToggle));
		});
	}

	return rows;
}
