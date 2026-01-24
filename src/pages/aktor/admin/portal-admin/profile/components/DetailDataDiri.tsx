import { BasicLabel } from "@/components/common/BasicLabel";
import type { ManajemenUserByID } from "../../manajemen-user/list-user/model";

export function DetailDataDiri({
	data,
}: {
	data: ManajemenUserByID | undefined;
}) {
	return (
		<>
			<p className="text-primary font-medium text-lg">Data Diri</p>

			<div className="flex flex-col gap-2">
				<BasicLabel
					label="Nama"
					value={data?.nama}
					className="flex flex-col md:flex-row"
					labelClassName="md:min-w-1/5"
				/>
				<BasicLabel
					label="NIP"
					value={data?.nip}
					labelClassName="md:min-w-1/5"
					className="flex flex-col md:flex-row"
				/>
				<BasicLabel
					label="Email"
					value={data?.email}
					labelClassName="md:min-w-1/5"
					className="flex flex-col md:flex-row"
				/>
				<BasicLabel
					label="Telepon"
					labelClassName="md:min-w-1/5"
					value={data?.no_telp}
					className="flex flex-col md:flex-row"
				/>
				<BasicLabel
					label="Pangkat/Golongan"
					labelClassName="md:min-w-1/5"
					value={data?.pangkat_golongan}
					className="flex flex-col md:flex-row"
				/>
				<BasicLabel
					label="Alamat"
					labelClassName="md:min-w-1/5"
					value={data?.alamat}
					className="flex flex-col md:flex-row"
				/>
			</div>
		</>
	);
}
