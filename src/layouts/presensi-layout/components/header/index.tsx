import { Bell, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetProfilOrganisasi } from "@/pages/modules/portal-sekolah/profil-organisasi/profil/controller";
import { getInitials } from "@/utils/helpers";
import { useGetProfile } from "@/pages/modules/portal-sekolah/profile/controller";
import { MenubarProfil } from "./menubarProfil";
import { BlackHole } from "@/layouts/main-layout/components/BlackHole";

export function HeaderPresensiDesa() {
	const { data: profilDesa, loading } = useGetProfilOrganisasi();
	const { loading: loadingProfile, data } = useGetProfile();
	const navigate = useNavigate();

	const Skeleton = () => (
		<div className="flex items-center gap-6">
			<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white">
				<div className="h-8 w-8 animate-pulse rounded-lg bg-gray-300" />
			</div>

			<div className="flex flex-col gap-2">
				<div className="h-4 w-32 animate-pulse rounded bg-gray-300" />
				<div className="h-5 w-48 animate-pulse rounded bg-gray-300" />
			</div>
		</div>
	);

	return (
		<div
			className="md:flex md:items-center hidden md:justify-between p-4 md:px-24 text-white"
			style={{
				background: "linear-gradient(90deg, #1e5916 0%, #0f2d0b 100%)",
			}}
		>
			{/* Left */}
			{loading ? (
				<Skeleton />
			) : (
				<div className="flex items-center gap-6">
					<div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white">
						{profilDesa?.photo_sekolah ? (
							<img
								src={profilDesa.photo_sekolah}
								alt={profilDesa.nama_sekolah}
								className="h-8 w-8 rounded-md object-cover"
							/>
						) : (
							<span className="text-lg font-semibold text-primary">
								{getInitials(profilDesa?.nama_sekolah || "-")}
							</span>
						)}
					</div>

					<div className="flex flex-col leading-tight">
						<span className="text-sm opacity-80">Presensi Online</span>
						<span className="text-lg font-semibold">
							{profilDesa?.nama_sekolah || "-"}
						</span>
					</div>
				</div>
			)}

			{/* Right */}
			<div className="flex items-center gap-4">
				<Bell
					size={18}
					className="cursor-pointer opacity-90 hover:opacity-100"
				/>
				<LayoutDashboard
					size={18}
					className="cursor-pointer opacity-90 hover:opacity-100"
					onClick={() => navigate("/")}
				/>

				<BlackHole />

				<MenubarProfil data={data} loading={loadingProfile} />
			</div>
		</div>
	);
}
