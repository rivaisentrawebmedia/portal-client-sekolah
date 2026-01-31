import {
	Menubar,
	MenubarContent,
	MenubarMenu,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { useState } from "react";
import { FaPrint } from "react-icons/fa";
import { DialogLogout } from "@/layouts/main-layout/components/dialogLogout";
import { ButtonCetakSuratBelakang, ButtonCetakSuratDepanV2 } from "./print";
import type { SuratTugasByID } from "../list-surat-tugas/model";
import type { KopSurat } from "../../../pengaturan/kop-surat/kop-sekolah/model";

export function MenubarPrint2({
	data,
	kabupaten,
	kopSurat,
}: {
	data: SuratTugasByID;
	kopSurat: KopSurat;
	kabupaten: string;
}) {
	const [isLogoutOpen, setIsLogoutOpen] = useState(false);

	return (
		<>
			<Menubar className="bg-#161646] border border-none">
				<MenubarMenu>
					<MenubarTrigger className="group bg-[#161646] p-0">
						<div className="flex text-white py-1.5 px-2 rounded-md items-center gap-2 bg-[#161646]">
							<FaPrint />
							Cetak SPPD Versi 2
						</div>
					</MenubarTrigger>

					<MenubarContent align="end" className="min-w-[220px]">
						<ButtonCetakSuratDepanV2
							detailSuratTugas={data}
							kabupaten={kabupaten}
							kop_surat={kopSurat}
						/>

						<ButtonCetakSuratBelakang detailSuratTugas={data} />
					</MenubarContent>
				</MenubarMenu>
			</Menubar>

			<DialogLogout open={isLogoutOpen} onOpenChange={setIsLogoutOpen} />
		</>
	);
}
