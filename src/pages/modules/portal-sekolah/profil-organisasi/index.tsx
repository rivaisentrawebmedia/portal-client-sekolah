import { usePathname } from "@/utils/usePathname";
import clsx from "clsx";
import { Link, Outlet } from "react-router-dom";

export default function ProfilOrganisasiLayout() {
	const { thirdPathname } = usePathname();
	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex gap-0 w-full rounded-full border border-[#1E5916]">
					<Link
						to="/modules/profil-organisasi"
						className={clsx(
							"w-full text-center duration-300 transition-colors rounded-l-full py-1.5",
							{
								"bg-[#1E5916] text-white": !thirdPathname,
								"text-[#1E5916]": thirdPathname,
							},
						)}
					>
						Profil Organisasi
					</Link>
					<Link
						to="/modules/profil-organisasi/visi-misi-tujuan"
						className={clsx(
							"w-full text-center duration-300 transition-colors py-1.5",
							{
								"bg-[#1E5916] text-white": thirdPathname === "visi-misi-tujuan",
								"text-[#1E5916]": thirdPathname !== "visi-misi-tujuan",
							},
						)}
					>
						Visi, Misi, Tujuan
					</Link>
					<Link
						to="/modules/profil-organisasi/galeri"
						className={clsx(
							"w-full text-center duration-300 transition-colors rounded-r-full py-1.5",
							{
								"bg-[#1E5916] text-white": thirdPathname === "galeri",
								"text-[#1E5916]": thirdPathname !== "galeri",
							},
						)}
					>
						Galeri
					</Link>
				</div>
				<Outlet />
			</div>
		</>
	);
}
