import { useState } from "react";
import {
	FaBullseye,
	FaChartLine,
	FaCrosshairs,
	FaIdCard,
} from "react-icons/fa";
import {
	EditHasilPage,
	EditIdentitasPage,
	EditSasaranPage,
	EditTujuanPage,
} from "./components";
import { TabRecovery } from "../../../surat/pengaturan/kop-surat/TabRecovery";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

export default function EditTentangSekolah() {
	const navigate = useNavigate();
	const menu = [
		{ label: "Identitas", icon: FaIdCard },
		{ label: "Tujuan", icon: FaBullseye },
		{ label: "Sasaran", icon: FaCrosshairs },
		{ label: "Hasil", icon: FaChartLine },
	];

	const [selected, setSelected] = useState<string>(menu?.[0]?.label);

	const konten = () => {
		switch (selected) {
			case menu?.[0]?.label:
				return <EditIdentitasPage />;
			case menu?.[1]?.label:
				return <EditTujuanPage />;
			case menu?.[2]?.label:
				return <EditSasaranPage />;
			case menu?.[3]?.label:
				return <EditHasilPage />;
			default:
				return <></>;
		}
	};
	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#162259] font-medium">Tentang Sekolah</p>

					<Button
						type="button"
						onClick={() => {
							navigate("/admin/website/profil-sekolah/tentang-sekolah");
						}}
						variant={"outline"}
						className="border-[#276CCD] text-[#276CCD] hover:text-[#276CCD]"
					>
						<Eye />
						Preview Data
					</Button>
				</div>
				<div className="flex flex-col gap-4 w-full md:flex-row">
					<TabRecovery
						menu={menu}
						selected={selected}
						setSelected={setSelected}
						title="Tentang Sekolah"
					/>
					<div className="flex flex-col h-fit gap-0 border rounded-md flex-1">
						{konten()}
					</div>
				</div>
			</div>
		</>
	);
}
