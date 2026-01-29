import { useState } from "react";
import { FaLandmark, FaSchool } from "react-icons/fa";
import { TabRecovery } from "./TabRecovery";
import { KopSuratDesa } from "./kop-sekolah";

export default function KopSuratPage() {
	const menu = [
		{
			label: "Kop Surat Sekolah",
			icon: FaSchool,
		},
		{
			label: "Kop Surat Dinas",
			icon: FaLandmark,
		},
	];

	const [selected, setSelected] = useState<string>(menu?.[0]?.label);

	const konten = () => {
		switch (selected) {
			case menu?.[0]?.label:
				return <KopSuratDesa />;
			case menu?.[1]?.label:
				return <p></p>;

			default:
				return <></>;
		}
	};
	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#162259] font-medium">Recovery Data</p>
				</div>
				<div className="flex flex-col gap-4 w-full md:flex-row">
					<TabRecovery
						menu={menu}
						selected={selected}
						setSelected={setSelected}
						title="Manajemen Client"
					/>
					{konten()}
				</div>
			</div>
		</>
	);
}
