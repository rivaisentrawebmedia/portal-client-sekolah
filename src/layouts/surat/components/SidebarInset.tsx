import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TimeNow } from "@/layouts/main-layout/components";
import { useHeaderTitle } from "@/layouts/main-layout/hooks/headerContext";
import type { Profile } from "@/pages/aktor/admin/portal-admin/profile/model";
import { convertSlugToText } from "@/utils/helpers";
import { Outlet } from "react-router-dom";
import { MenubarProfil } from "./MenubarProfil";
import { BlackHole } from "./BlackHole";

export function SidebarInsetWebsite({
	profile,
	loading,
	thirdPathname,
}: {
	profile: Profile | undefined;
	loading: boolean;
	thirdPathname: string | null;
}) {
	const { title } = useHeaderTitle();

	return (
		<SidebarInset className="flex flex-col w-full bg-white">
			{/* MOBILE HEADER */}
			<header className="flex md:hidden bg-[#161646] text-white items-center gap-2 px-4 h-14 border-b">
				<SidebarTrigger />
				<span className="font-semibold">Perjalanan Dinas</span>
			</header>

			{/* DESKTOP HEADER */}
			<header className="hidden md:flex items-center bg-[#161646] text-white justify-between border-b px-4 py-2">
				<div>
					<p className="font-semibold">
						{title || convertSlugToText(thirdPathname || "Dashboard")}
					</p>
					<TimeNow className="text-white/80 text-sm" />
				</div>

				<div className="flex items-center gap-2">
					<BlackHole />
					<MenubarProfil data={profile} loading={loading} />
				</div>
			</header>

			<main className="flex-1 p-4">
				<Outlet />
			</main>
		</SidebarInset>
	);
}
