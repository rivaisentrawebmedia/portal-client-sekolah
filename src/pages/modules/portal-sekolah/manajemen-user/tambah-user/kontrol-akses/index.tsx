import {
	useGetKontrolAkses,
	useGetManajemenUserByID,
} from "../../list-user/controller";
import { AksesMenu, DaftarModul, DetailUser } from "./components";

export default function KontrolAksesPage() {
	const { data, loading } = useGetManajemenUserByID();

	const {
		data: dataModul,
		loading: loadingModul,
		modul,
		setModul,
	} = useGetKontrolAkses();

	return (
		<>
			<div className="flex flex-col gap-4">
				<DetailUser data={data} loading={loading} />

				<div className="flex flex-col gap-4 md:flex-row">
					<div className="w-full md:w-1/4 flex flex-col gap-3">
						<p className="text-[#1E5916] font-medium text-lg">
							Daftar Aplikasi
						</p>
						<DaftarModul
							setModul={setModul}
							modul={modul}
							data={dataModul}
							loading={loadingModul}
						/>
					</div>
					<div className="flex-1 md:pl-4 md:border-l flex flex-col gap-3 border-[#C8C8C8]">
						<p className="text-[#1E5916] font-medium text-lg">
							Atur Akses User
						</p>

						<AksesMenu
							setModul={setModul}
							modul={modul}
							data={dataModul}
							loading={loadingModul}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
