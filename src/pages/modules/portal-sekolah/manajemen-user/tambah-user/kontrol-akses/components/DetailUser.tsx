import { getInitials } from "@/utils/helpers";
import type { ManajemenUserByID } from "../../../list-user/model";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaUser } from "react-icons/fa";
import { useGetReferensi } from "@/const/listReferensi";
import { Skeleton } from "@/components/ui/skeleton";

export function DetailUser({
	data,
	loading,
}: {
	data: ManajemenUserByID | undefined;
	loading: boolean;
}) {
	const { data: pangkatGolonganOptions } = useGetReferensi("pangkat-golongan");

	const pangkat = pangkatGolonganOptions?.find(
		(item) => item?.id === data?.pangkat_golongan_id,
	);

	return (
		<div className="flex flex-col gap-4 md:flex-row bg-[#f6fff5] border border-primary p-3 rounded-md">
			{/* FOTO / AVATAR */}
			{loading ? (
				<Skeleton className="h-40 w-40 rounded-md" />
			) : data?.photo ? (
				<img
					src={data.photo}
					alt={data.nama}
					className="h-40 w-40 rounded-md"
				/>
			) : (
				<div className="flex h-40 w-40 bg-[#01001a] text-white rounded-md items-center justify-center">
					{getInitials(data?.nama || "")}
				</div>
			)}

			{/* DETAIL */}
			<div className="flex flex-col gap-1.5 flex-1">
				{/* NIP */}
				{loading ? (
					<Skeleton className="h-4 w-40" />
				) : (
					<p className="font-medium text-[#1E5916]">NIP. {data?.nip || "-"}</p>
				)}

				{/* NAMA */}
				{loading ? (
					<Skeleton className="h-6 w-64" />
				) : (
					<p className="text-lg">{data?.nama || "-"}</p>
				)}

				{/* INFO ITEMS */}
				{loading ? (
					<>
						<InfoSkeleton />
						<InfoSkeleton />
						<InfoSkeleton />
						<InfoSkeleton />
					</>
				) : (
					<>
						<InfoItem
							icon={<FaUser color="#1E5916" />}
							value={
								pangkat
									? `${pangkat.nama_pangkat} - ${pangkat.nama_golongan}`
									: "-"
							}
						/>
						<InfoItem
							icon={<FaPhoneAlt color="#1E5916" />}
							value={data?.no_telp}
						/>
						<InfoItem
							icon={<FaEnvelope color="#1E5916" />}
							value={data?.email}
						/>
						<InfoItem
							icon={<FaMapMarkerAlt color="#1E5916" />}
							value={data?.alamat}
						/>
					</>
				)}
			</div>
		</div>
	);
}

function InfoSkeleton() {
	return (
		<div className="flex items-center gap-2">
			<Skeleton className="h-4 w-4 rounded-full" />
			<Skeleton className="h-4 w-48" />
		</div>
	);
}

function InfoItem({
	icon,
	value,
}: {
	icon: React.ReactNode;
	value?: string | React.ReactNode;
}) {
	return (
		<div className="flex items-center gap-2">
			{icon}
			<p className="text-sm">{value || "-"}</p>
		</div>
	);
}
