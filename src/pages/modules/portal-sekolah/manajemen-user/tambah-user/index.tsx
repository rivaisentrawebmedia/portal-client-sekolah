import { ArrowBack } from "@/components/common/ArrowBack";
import { usePathname } from "@/utils/usePathname";
import clsx from "clsx";
import { Outlet } from "react-router-dom";

export default function TambahUserPage() {
	const { fourthPathname } = usePathname();

	return (
		<>
			<div className="flex flex-col gap-4 w-full">
				<ArrowBack title="Tambah User" link="/modules/manajemen-user" />
				<div className="flex flex-col gap-4 w-full md:flex-row bg-[#F6FFF5] rounded-md p-4">
					<div
						className={clsx(
							"w-full gap-2 border duration-300 transition-colors rounded-md cursor-pointer bg-white p-2 flex items-center justify-center",
							{
								"border-[#DFDFDF] text-[#999999]": fourthPathname,
								"text-[#1E5916] border-[#1E5916]": !fourthPathname,
							},
						)}
					>
						Info Akun & User
					</div>

					<div
						className={clsx(
							"w-full gap-2 border duration-300 transition-colors rounded-md cursor-pointer bg-white p-2 flex items-center justify-center",
							{
								"text-[#1E5916] border-[#1E5916]":
									fourthPathname === "kontrol-akses",
								"border-[#DFDFDF] text-[#999]":
									!fourthPathname || fourthPathname === "info-akun-user",
							},
						)}
					>
						Kontrol Akses
					</div>
				</div>
				<Outlet />
			</div>
		</>
	);
}
