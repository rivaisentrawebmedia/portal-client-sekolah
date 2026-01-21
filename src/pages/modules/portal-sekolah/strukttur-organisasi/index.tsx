import { usePathname } from "@/utils/usePathname";
import clsx from "clsx";
import { Link, Outlet } from "react-router-dom";

export default function StrukturOrganisasiPage() {
	const { thirdPathname } = usePathname();
	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex gap-0 w-full rounded-full border border-[#1E5916]">
					<Link
						to="/modules/struktur-organisasi"
						className={clsx("w-full text-center rounded-l-full py-1.5", {
							"bg-[#1E5916] text-white": !thirdPathname,
							"text-[#1E5916]": thirdPathname,
						})}
					>
						Kelompok
					</Link>
					<Link
						to="/modules/struktur-organisasi/jabatan"
						className={clsx("w-full text-center rounded-r-full py-1.5", {
							"bg-[#1E5916] text-white": thirdPathname,
							"text-[#1E5916]": !thirdPathname,
						})}
					>
						Jabatan
					</Link>
				</div>
				<Outlet />
			</div>
		</>
	);
}
