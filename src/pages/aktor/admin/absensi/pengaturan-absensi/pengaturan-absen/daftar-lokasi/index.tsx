import { ButtonTambah, TableDaftarLokasi } from "./components";
import { useGetDaftarLokasi } from "./controller";

export function DaftarLokasiSection() {
	const { data, loading } = useGetDaftarLokasi();
	return (
		<div className="flex flex-col gap-4 p-4 bg-white rounded-md border border-primary">
			<div className="flex md:flex-row md:items-center flex-col md:justify-between gap-4">
				<p className="text-lg text-[#1E5916] font-medium">
					Daftar Lokasi / Gedung Absensi
				</p>
				<ButtonTambah />
			</div>

			<TableDaftarLokasi
				data={data}
				loading={loading}
				limit={1000}
				page={1}
				search={""}
			/>
		</div>
	);
}
