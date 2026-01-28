import { SidebarHeader } from "@/components/ui/sidebar";
import type { Profile } from "@/pages/aktor/admin/portal-admin/profile/model";
import { FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";

const SIDEBAR_BG = "#161646";

export function SidebarHeaderWebsite({
	profile,
}: {
	profile: Profile | undefined;
}) {
	return (
		<SidebarHeader
			className="px-4 py-3 text-white"
			style={{ background: SIDEBAR_BG }}
		>
			<Link to="/admin/surat" className="flex items-center gap-2">
				{profile?.photo_sekolah ? (
					<img src={profile.photo_sekolah} className="h-8 w-8 rounded-full" />
				) : (
					<div className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-[#0E4087]">
						<FaGraduationCap size={18} />
					</div>
				)}
				<div>
					<p className="font-medium">Perjalanan Dinas</p>
					<p className="text-xs">{profile?.nama_sekolah}</p>
				</div>
			</Link>
		</SidebarHeader>
	);
}
