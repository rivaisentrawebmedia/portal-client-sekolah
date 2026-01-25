import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { PengaturanAbsensiSection } from "./pengaturan";

export default function PengaturanAbsen() {
	return (
		<div className="flex flex-col gap-4 w-full">
			<Breadcrumbs
				items={[
					{
						label: "Home",
						to: "/admin/presensi",
					},
					{
						label: "Pengaturan Absensi",
					},
				]}
			/>

			<PengaturanAbsensiSection />
		</div>
	);
}
