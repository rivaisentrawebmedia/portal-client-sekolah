import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar, SidebarContent, SidebarMenu } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar-provider";
import { convertToSlug } from "@/utils/helpers";
import { usePathname } from "@/utils/usePathname";
import { useGetProfile } from "@/pages/aktor/admin/portal-admin/profile/controller";
import { useGetMenu } from "../main-layout/hooks";
import {
	MenuNoChild,
	MenuWithChild,
	SidebarHeaderWebsite,
	SidebarInsetWebsite,
} from "./components";

const SIDEBAR_BG = "#0E4087";

const MENU_GROUPS: Record<string, string[]> = {
	"Publikasi & Informasi": [
		"Pengumuman",
		"Mading",
		"Berita",
		"Agenda",
		"Prestasi",
	],
	"Galeri & Media": ["Galeri Foto"],
	"Layanan Publik": ["Kontak", "Info Kelulusan Siswa", "Konten"],
};

export default function WebsiteLayout() {
	const { thirdPathname, fourthPathname } = usePathname();

	const { data: profile, loading } = useGetProfile();
	const { data: sidebarItems = [], loading: loadingMenu } = useGetMenu();

	/* ===============================
		HELPER
	================================ */
	function getGroupName(menuName: string) {
		const found = Object.entries(MENU_GROUPS).find(([, names]) =>
			names.includes(menuName),
		);
		return found?.[0] ?? "Lainnya";
	}

	/* ===============================
		SPLIT MENU
	================================ */
	const topMenus = sidebarItems.filter(
		(item) => item?.nama === "Dashboard" || item?.nama === "Profil Sekolah",
	);

	const groupedMenus = sidebarItems
		?.filter(
			(item) => item.nama !== "Dashboard" && item.nama !== "Profil Sekolah",
		)
		?.reduce<Record<string, typeof sidebarItems>>((acc, item) => {
			const group = getGroupName(item.nama);
			if (!acc[group]) acc[group] = [];
			acc[group].push(item);
			return acc;
		}, {});

	return (
		<SidebarProvider>
			<div className="flex min-h-svh w-full">
				{/* SIDEBAR */}
				<Sidebar className="border-none">
					<SidebarHeaderWebsite profile={profile} />

					<SidebarContent
						className="text-white "
						style={{ background: SIDEBAR_BG }}
					>
						<ScrollArea className="h-[calc(100svh-64px)] p-3">
							<SidebarMenu className="gap-2">
								{/* ===== LOADING SKELETON ===== */}
								{loadingMenu &&
									Array.from({ length: 6 }).map((_, i) => (
										<div
											key={i}
											className="h-10 rounded-md bg-white/10 animate-pulse"
										/>
									))}

								{/* ===== DASHBOARD && Profil Sekolah ===== */}
								{!loadingMenu && (
									<div className="flex flex-col">
										{topMenus?.map((item, idx) => {
											const isActive =
												thirdPathname === convertToSlug(item?.nama) ||
												(!thirdPathname && item?.nama === "Dashboard");

											/* ===============================
											CASE: TOP MENU TANPA CHILD
										================================ */
											if (!item?.children) {
												return (
													<MenuNoChild
														idx={idx}
														isActive={isActive}
														item={item}
													/>
												);
											}

											/* ===============================
											CASE: TOP MENU DENGAN CHILD
										================================ */
											const isChildActive = item.children.some(
												(child) =>
													fourthPathname === convertToSlug(child?.nama),
											);

											return (
												<MenuWithChild
													fourthPathname={fourthPathname || ""}
													idx={idx}
													isChildActive={isChildActive}
													item={item}
												/>
											);
										})}
									</div>
								)}

								{/* ===== GROUPED MENU ===== */}
								{!loadingMenu &&
									Object?.entries(groupedMenus)?.map(([groupName, items]) => (
										<div key={groupName} className="mt-3">
											<p
												className="px-3 mb-2 text-xs uppercase text-white/60 font-mono"
												style={{
													letterSpacing: "1px",
												}}
											>
												{groupName}
											</p>

											{items?.map((item, idx) => {
												/* ===== PARENT WITHOUT CHILD ===== */
												if (!item?.children) {
													const isActive =
														convertToSlug(item?.nama) === thirdPathname;

													return (
														<MenuNoChild
															idx={idx}
															isActive={isActive}
															item={item}
														/>
													);
												}

												/* ===== ACCORDION (AUTO OPEN) ===== */
												const activeChild = item?.children?.some(
													(child) =>
														fourthPathname === convertToSlug(child?.nama),
												);

												return (
													<MenuWithChild
														fourthPathname={fourthPathname || ""}
														idx={idx}
														isChildActive={activeChild}
														item={item}
													/>
												);
											})}
										</div>
									))}
							</SidebarMenu>
						</ScrollArea>
					</SidebarContent>
				</Sidebar>

				{/* MAIN */}
				<SidebarInsetWebsite
					loading={loading}
					profile={profile}
					thirdPathname={thirdPathname}
				/>
			</div>
		</SidebarProvider>
	);
}
