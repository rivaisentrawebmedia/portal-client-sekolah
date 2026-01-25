import { useSearchParams } from "react-router-dom";
import { useGetMonitoringKehadiran } from "./controller";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import { TableMonitoringKehadiran } from "./components";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { Pagination } from "@/components/common/pagination";
import { useForm } from "react-hook-form";
import { MonitoringKehadiranSchema } from "./model";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import type { GetMonitoringKehadiranParams } from "./model/dataAPI";
import { Form } from "@/components/ui/form";
import { InputCommon, SelectCommon } from "@/components/common/basic-input";
import { StatusPresensiOptions } from "@/const/listStatusPresensi";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";

export default function MonitoringKehadiranPage() {
	const [searchParams] = useSearchParams();

	const form = useForm<zod.infer<typeof MonitoringKehadiranSchema>>({
		resolver: zodResolver(MonitoringKehadiranSchema),
		mode: "onSubmit",
	});

	const page = searchParams.get("page-monitoring-kehadiran");
	const limit = searchParams.get("limit-monitoring-kehadiran");
	const search = searchParams.get("search-monitoring-kehadiran");
	const status = form.watch("status");
	const tanggal = form.watch("tanggal");

	const paramsDefault: GetMonitoringKehadiranParams = {
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
		status: status || "",
		tanggal: tanggal || "",
	};

	const { data, loading, meta } = useGetMonitoringKehadiran(paramsDefault);

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
							label: "Monitoring Kehadiran",
						},
					]}
				/>
				<div className="flex flex-row items-center justify-between gap-4">
					<p className="text-2xl text-[#1E5916] font-medium">
						Monitoring Kehadiran
					</p>
				</div>

				<Form {...form}>
					<form className="flex flex-col gap-4 md:flex-row">
						<SelectCommon
							form={form}
							name="status"
							options={StatusPresensiOptions}
							disabled={loading}
							label="Status"
							className="w-full md:w-1/4"
							placeholder="Pilih periode cuti"
						/>

						<InputCommon
							form={form}
							name="tanggal"
							disabled={loading}
							label="Tanggal*"
							type="date"
							className="w-full md:w-1/4"
						/>
					</form>
				</Form>

				{form.watch("tanggal") ? (
					<>
						<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
							<LimitSelect
								pageKey="page-monitoring-kehadiran"
								limitKey="limit-monitoring-kehadiran"
							/>
							<SearchInput
								pageKey="page-monitoring-kehadiran"
								searchKey="search-monitoring-kehadiran"
							/>
						</div>
						<TableMonitoringKehadiran
							data={data}
							loading={loading}
							limit={paramsDefault?.limit || 10}
							page={paramsDefault?.page}
							search={paramsDefault?.search || ""}
						/>
						{data?.length > 0 && (
							<Pagination meta={meta} pageKey="page-monitoring-kehadiran" />
						)}
					</>
				) : (
					<Empty className="border-0 rounded-none">
						<EmptyHeader>
							<EmptyTitle>Tanggal belum dipilih</EmptyTitle>
							<EmptyDescription>
								Silakan pilih tanggal terlebih dahulu untuk melanjutkan.
							</EmptyDescription>
						</EmptyHeader>
					</Empty>
				)}
			</div>
		</>
	);
}
