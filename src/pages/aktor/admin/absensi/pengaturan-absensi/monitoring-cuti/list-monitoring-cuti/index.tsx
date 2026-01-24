import { useSearchParams } from "react-router-dom";
import { useGetMonitoringCuti } from "./controller";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { TableMonitoringCuti } from "./components";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { Pagination } from "@/components/common/pagination";
import type { GetMonitoringCutiParams } from "./model/dataAPI";
import { useForm } from "react-hook-form";
import { MonitoringCutiSchema } from "./model";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Form } from "@/components/ui/form";
import { SelectCommon } from "@/components/common/basic-input";
import { useGetPeriodeCuti } from "../../periode-cuti/controller";

export default function MonitoringCutiPage() {
	const [searchParams, setSearchParams] = useSearchParams();

	const form = useForm<zod.infer<typeof MonitoringCutiSchema>>({
		resolver: zodResolver(MonitoringCutiSchema),
		mode: "onSubmit",
	});

	const page = searchParams.get("page-monitoring-cuti");
	const limit = searchParams.get("limit-monitoring-cuti");
	const search = searchParams.get("search-monitoring-cuti");
	const periode_cuti_id = searchParams.get("periode-cuti-id");

	const paramsDefault: GetMonitoringCutiParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		periode_cuti_id: periode_cuti_id || "",
	};

	const { data, loading, meta } = useGetMonitoringCuti(paramsDefault);

	const { data: periodeCutiOptions, loading: loadingPeriodeCuti } =
		useGetPeriodeCuti({
			page: 1,
		});

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
							label: "Monitoring Cuti",
						},
					]}
				/>
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">Monitoring Cuti</p>
				</div>

				<Form {...form}>
					<form className="flex flex-col gap-4">
						<SelectCommon
							form={form}
							name="periode_cuti_id"
							options={periodeCutiOptions?.map((item) => {
								return {
									label: item?.nama,
									value: item?.id,
								};
							})}
							disabled={loadingPeriodeCuti}
							isLoading={loadingPeriodeCuti}
							label="Periode Cuti"
							className="w-full md:w-1/4"
							placeholder="Pilih periode cuti"
							fx={(value) => {
								const newParams = new URLSearchParams(searchParams.toString());

								newParams.set("periode-cuti-id", value);

								setSearchParams(newParams);
							}}
						/>
					</form>
				</Form>

				{periode_cuti_id && (
					<>
						<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
							<LimitSelect
								pageKey="page-monitoring-cuti"
								limitKey="limit-monitoring-cuti"
							/>
							<SearchInput
								pageKey="page-monitoring-cuti"
								searchKey="search-monitoring-cuti"
							/>
						</div>
						<TableMonitoringCuti
							data={data}
							loading={loading}
							limit={Number(limit || 10)}
							page={Number(page || 1)}
							search={search || ""}
						/>
						{data?.length > 0 && (
							<Pagination meta={meta} pageKey="page-monitoring-cuti" />
						)}
					</>
				)}
			</div>
		</>
	);
}
