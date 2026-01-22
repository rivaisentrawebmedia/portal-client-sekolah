import { ArrowBack } from "@/components/common/ArrowBack";
import {
	ButtonGantiPassword,
	DetailDataAkun,
	DetailDataDiri,
	DetailKontrolAkses,
	DetailProfil,
	DetailProfilSuperAdmin,
	TabProfil,
} from "./components";
import { useGetProfile, useGetProfilUser } from "./controller";
import { useState } from "react";

export default function ProfilePage() {
	const listMenu = ["Data Akun", "Data Diri", "Kontrok Akses"];

	const { data: dataProfil, loading: loadingProfil } = useGetProfile();

	const { data, loading } = useGetProfilUser(dataProfil?.id || "");

	const disabled = loadingProfil || loading;

	const [menu, setMenu] = useState<string>(listMenu?.[0]);

	const konten = () => {
		switch (menu) {
			case listMenu?.[0]:
				return <DetailDataAkun dataProfil={dataProfil} />;
			case listMenu?.[1]:
				return <DetailDataDiri data={data} />;
			case listMenu?.[2]:
				return <DetailKontrolAkses data={dataProfil} />;
			default:
				return <></>;
		}
	};

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-4">
					<ArrowBack link={`/modules`} title="Profil Client" />
					<ButtonGantiPassword />
				</div>
				{dataProfil?.is_superadmin ? (
					<DetailProfilSuperAdmin loading={disabled} dataProfil={dataProfil} />
				) : (
					<DetailProfil
						data={data}
						loading={disabled}
						dataProfil={dataProfil}
					/>
				)}

				<TabProfil
					dataProfil={dataProfil}
					listMenu={listMenu}
					setMenu={setMenu}
					menu={menu}
				/>

				{konten()}
			</div>
		</>
	);
}
