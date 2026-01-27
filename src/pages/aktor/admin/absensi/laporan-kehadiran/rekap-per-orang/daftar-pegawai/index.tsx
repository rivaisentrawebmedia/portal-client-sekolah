import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { useSearchParams } from "react-router-dom";
import { TableDaftarPegawai } from "./components";
import {
	FilterRekapPerOrangSchema,
	type GetRekapPerOrangParams,
} from "./model";
import dayjs from "dayjs";
import { useGetRekapPerOrang } from "./controller";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { SelectCommon } from "@/components/common/basic-input";
import { getBulanOptions, getTahunOptions } from "@/const/listTanggal";

export default function DaftarPegawaiRekapPerOrangPage() {
	const [searchParams, setSearchParams] = useSearchParams();

	const form = useForm<zod.infer<typeof FilterRekapPerOrangSchema>>({
		resolver: zodResolver(FilterRekapPerOrangSchema),
		mode: "onSubmit",
	});

	const tahun =
		searchParams.get("tahun") || dayjs().locale("id").format("YYYY");
	const bulan = searchParams.get("bulan") || dayjs().locale("id").format("MM");

	const paramsDefault: GetRekapPerOrangParams = {
		tahun: tahun,
		bulan: bulan,
	};

	const { data, loading } = useGetRekapPerOrang(paramsDefault);

	useEffect(() => {
		if (tahun) {
			form.setValue("tahun", tahun);
		}
	}, [tahun]);

	useEffect(() => {
		if (bulan) {
			form.setValue("bulan", bulan);
		}
	}, [bulan]);

	return (
		<>
			<div className="flex flex-col gap-4 w-full">
				<Breadcrumbs
					items={[
						{
							label: "Home",
							to: "/admin/presensi",
						},
						{
							label: "Rekap Per Orang",
						},
					]}
				/>
				<p className="text-2xl text-[#1E5916] font-medium">Rekap Per Orang</p>

				<Form {...form}>
					<form className="flex flex-col md:flex-row w-full gap-4">
						<SelectCommon
							form={form}
							name="tahun"
							options={getTahunOptions()}
							className="w-full md:w-1/4"
							placeholder="Pilih tahun"
							fx={(value) => {
								const newParams = new URLSearchParams(searchParams.toString());

								newParams.set("tahun", value);

								setSearchParams(newParams);
							}}
						/>

						<SelectCommon
							form={form}
							name="bulan"
							options={getBulanOptions()}
							className="w-full md:w-1/4"
							placeholder="Pilih bulan"
							fx={(value) => {
								const newParams = new URLSearchParams(searchParams.toString());

								newParams.set("bulan", value);

								setSearchParams(newParams);
							}}
						/>
					</form>
				</Form>

				<TableDaftarPegawai
					data={data}
					loading={loading}
					limit={1000}
					page={1}
					search={""}
				/>
			</div>
		</>
	);
}
