import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { PengaturanAbsensiSection } from "./pengaturan";
import { DaftarLokasiSection } from "./daftar-lokasi";
import { JamMasukSection } from "./jam-masuk";

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
			<JamMasukSection />
			<DaftarLokasiSection />
		</div>
	);
}
