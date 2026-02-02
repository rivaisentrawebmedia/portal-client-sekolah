import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/utils/helpers";
import { HtmlPreview } from "@/utils/safeHTML";

export function VisiMisi({
	gambar,
	isi,
	nama,
	items,
}: {
	gambar: string;
	nama: "Tujuan" | "Sasaran" | "Hasil";
	isi: string | undefined;
	items: string[] | undefined;
}) {
	return (
		<>
			<div className="flex items-center gap-2">
				<p className="text-nowrap text-[#276CCD] font-medium">{nama}</p>
				<Separator />
			</div>

			<div className="flex flex-col gap-4 md:flex-row">
				{gambar ? (
					<img
						src={gambar}
						className="w-[240px] h-[320px] rounded-md"
						alt={nama}
					/>
				) : (
					<div className="flex items-center bg-[#0e4087] text-2xl text-white justify-center w-[240px] h-[320px] rounded-md">
						{getInitials(nama || "")}
					</div>
				)}
				<div className="flex flex-col gap-2 flex-1">
					<HtmlPreview html={isi} />
					<ul className="list-disc pl-6">
						{items?.map((item, idx) => {
							return (
								<li key={idx} className="">
									{item}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
}
