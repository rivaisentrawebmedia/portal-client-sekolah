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

const SIDEBAR_BG = "#161646";

export default function SuratLayout() {
	const { thirdPathname, fourthPathname } = usePathname();

	const { data: profile, loading } = useGetProfile();
	const { data: sidebarItems = [], loading: loadingMenu } = useGetMenu();

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

								{!loadingMenu && (
									<div className="flex flex-col">
										{sidebarItems?.map((item, idx) => {
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
														key={idx}
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
													key={idx}
												/>
											);
										})}
									</div>
								)}
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
