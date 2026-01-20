import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";
import { SelectCommon } from "./SelectCommon";
import {
	getBulanOptions,
	getTahunOptions,
	getTanggalOptions,
} from "@/const/listTanggal";

export function InpuTTanggalLahir({
	form,
	className,
	label,
	labelClassname,
}: {
	form: UseFormReturn<any>;
	label?: ReactNode;
	className?: string;
	labelClassname?: string;
}) {
	return (
		<div className={className}>
			<p
				className={labelClassname}
				style={{
					fontWeight: "lighter",
					letterSpacing: "1px",
				}}
			>
				{label}
			</p>
			<div className="flex flex-1 flex-col gap-2 md:flex-row">
				<SelectCommon
					form={form}
					name="tanggal_lahir"
					placeholder="Tanggal Lahir"
					isMulti={false}
					options={getTanggalOptions()}
					className="w-full md:w-fit md:min-w-48"
				/>
				<SelectCommon
					form={form}
					disabled={!form.watch("tanggal_lahir")}
					name="bulan_lahir"
					placeholder="Bulan Lahir"
					isMulti={false}
					options={getBulanOptions()}
					className="w-full md:w-fit md:min-w-48"
				/>
				<SelectCommon
					form={form}
					name="tahun_lahir"
					disabled={!form.watch("bulan_lahir")}
					placeholder="Tahun Lahir"
					isMulti={false}
					options={getTahunOptions()}
					className="w-full md:w-fit md:min-w-48"
				/>
			</div>
		</div>
	);
}
