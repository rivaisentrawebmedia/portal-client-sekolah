import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FilterRekapVisitSchema, type GetRekapVisitParams } from "../model";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { useGetRekapVisit } from "../controller";
import { useEffect } from "react";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { Pagination } from "@/components/common/pagination";
import { TableRekapVisit } from "./TableDataVisit";
import * as zod from "zod";
import { Form } from "@/components/ui/form";
import { SelectCommon } from "@/components/common/basic-input";
import { getTahunOptions } from "@/const/listTanggal";

export function RekapVisit() {
	const [searchParams, setSearchParams] = useSearchParams();

	const form = useForm<zod.infer<typeof FilterRekapVisitSchema>>({
		resolver: zodResolver(FilterRekapVisitSchema),
		mode: "onSubmit",
	});

	const tahun =
		searchParams.get("tahun") || dayjs().locale("id").format("YYYY");
	const page = searchParams.get("page-rekap-visit");
	const limit = searchParams.get("limit-rekap-visit");
	const search = searchParams.get("search-rekap-visit");

	const paramsDefault: GetRekapVisitParams = {
		tahun: tahun,
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
	};

	const { data, loading, meta } = useGetRekapVisit(paramsDefault);

	useEffect(() => {
		if (tahun) {
			form.setValue("tahun", tahun);
		}
	}, [tahun]);

	return (
		<>
			<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
				<LimitSelect pageKey="page-rekap-visit" limitKey="limit-rekap-visit" />
				<SearchInput
					pageKey="page-rekap-visit"
					searchKey="search-rekap-visit"
				/>
				<Form {...form}>
					<form className="flex flex-col md:w-1/4 md:justify-end md:flex-row w-full gap-4">
						<SelectCommon
							form={form}
							name="tahun"
							options={getTahunOptions()}
							className="w-full"
							placeholder="Pilih tahun"
							fx={(value) => {
								const newParams = new URLSearchParams(searchParams.toString());

								newParams.set("tahun", value);

								setSearchParams(newParams);
							}}
						/>
					</form>
				</Form>
			</div>
			<TableRekapVisit
				data={data}
				loading={loading}
				limit={1000}
				page={1}
				search={""}
			/>
			{data?.length > 0 && (
				<Pagination meta={meta} pageKey="page-rekap-visit" />
			)}
		</>
	);
}
