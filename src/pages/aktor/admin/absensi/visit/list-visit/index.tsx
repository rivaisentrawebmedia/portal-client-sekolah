import { useGetVisit, usePostStatusVisit } from "./controller";
import { Breadcrumbs } from "@/layouts/presensi-layout/components/BreadCrumbs";
import {
	DialogData,
	RekapVisit,
	TabCuti,
	TableVisit,
	TableVisitBoChecked,
} from "./components";
import { type GetVisitParams } from "./model";
import { useSearchParams } from "react-router-dom";
import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";
import { Pagination } from "@/components/common/pagination";
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

type StatusParams = "diajukan" | "disetujui" | "ditolak" | "rekap-visit";

const ALLOWED_STATUS: StatusParams[] = [
	"diajukan",
	"disetujui",
	"ditolak",
	"rekap-visit",
];

function parseStatusParams(value: string | null): StatusParams {
	if (ALLOWED_STATUS.includes(value as StatusParams)) {
		return value as StatusParams;
	}
	return "diajukan"; // default
}

export default function VisitPage() {
	const [searchParams] = useSearchParams();
	const listStatus = ["diajukan", "disetujui", "ditolak"];

	const statusParams: StatusParams = parseStatusParams(
		searchParams.get("status"),
	);

	const page = searchParams.get("page-visit");
	const limit = searchParams.get("limit-visit");
	const search = searchParams.get("search-visit");

	const paramsDefault: GetVisitParams = {
		status: statusParams || "",
		page: Number(page) || 1,
		limit: Number(limit) || 10,
		search: search || "",
	};

	const { data, loading, meta } = useGetVisit(paramsDefault);

	const { checkedPool, setCheckedPool, isShow, setIsShow, onSubmit, disabled } =
		usePostStatusVisit();

	const [alasan, setAlasan] = useState<string>("");
	const [status, setStatus] = useState<"diajukan" | "disetujui" | "ditolak">();

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
							label: "Visit",
						},
					]}
				/>
				<p className="text-2xl text-[#1E5916] font-medium">Visit</p>

				<div className="flex flex-col">
					<TabCuti
						listStatus={listStatus}
						statusParams={statusParams}
						meta={meta}
					/>

					<div className="flex flex-col gap-4 p-4 border-x border-b border-primary">
						{statusParams === "rekap-visit" ? (
							<RekapVisit />
						) : statusParams === "diajukan" ? (
							<>
								<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
									<LimitSelect pageKey="page-visit" limitKey="limit-visit" />
									<SearchInput pageKey="page-visit" searchKey="search-visit" />

									{statusParams === "diajukan" && (
										<div className="flex items-center gap-2">
											<button
												type="button"
												disabled={loading || checkedPool?.length <= 0}
												onClick={() => {
													setStatus("disetujui");
													setCheckedPool(checkedPool);
													setIsShow(true);
												}}
												className="flex justify-center items-center text-nowrap gap-2 px-3 disabled:bg-emerald-300 rounded-md py-1.5 bg-emerald-500 text-white"
											>
												<CheckCircle size={14} />
												Setuju ({checkedPool?.length})
											</button>
											<button
												type="button"
												onClick={() => {
													setStatus("ditolak");
													setCheckedPool(checkedPool);
													setIsShow(true);
												}}
												disabled={loading || checkedPool?.length <= 0}
												className="flex justify-center items-center text-nowrap gap-2 px-3 disabled:bg-rose-300 rounded-md py-1.5 bg-rose-500 text-white"
											>
												<XCircle size={14} />
												Tolak ({checkedPool?.length})
											</button>
										</div>
									)}
								</div>
								<TableVisit
									data={data}
									loading={loading}
									limit={1000}
									page={1}
									search={""}
									checked={checkedPool}
									setChecked={setCheckedPool}
								/>
								{data?.length > 0 && (
									<Pagination meta={meta} pageKey="page-visit" />
								)}
							</>
						) : (
							<>
								<div className="flex flex-col gap-2 w-full md:flex-row md:items-center md:gap-4">
									<LimitSelect pageKey="page-visit" limitKey="limit-visit" />
									<SearchInput pageKey="page-visit" searchKey="search-visit" />
								</div>
								<TableVisitBoChecked
									data={data}
									loading={loading}
									limit={1000}
									page={1}
									search={""}
								/>
								{data?.length > 0 && (
									<Pagination meta={meta} pageKey="page-visit" />
								)}
							</>
						)}
					</div>
				</div>
			</div>

			<DialogData
				disabled={disabled}
				isShow={isShow}
				onSubmit={onSubmit}
				setIsShow={setIsShow}
				status={status || "disetujui"}
				description={
					status === "disetujui" ? (
						<p>
							Anda akan menyetujui {checkedPool?.length} Visit. Apakah anda
							yakin untuk mengajukan Visit yang telah Anda pilih?
						</p>
					) : status === "ditolak" ? (
						<p>
							Anda akan menolak {checkedPool?.length} Visit. Apakah anda yakin
							untuk menolak Visit yang telah Anda pilih?
						</p>
					) : (
						""
					)
				}
				label={
					status === "disetujui"
						? "Setujui Visit"
						: status === "ditolak"
							? "Tolak Visit"
							: ""
				}
				alasan={alasan}
				content={
					status === "ditolak" ? (
						<div className="flex flex-col gap-2">
							<label
								style={{
									fontWeight: "lighter",
									letterSpacing: "1px",
								}}
								className="text-md text-[#CD2738]"
							>
								Alasan Penolakan*
							</label>
							<textarea
								className="w-full rounded-md border border-[#CD2738] p-2 text-sm"
								rows={4}
								placeholder="Tuliskan alasan penolakan..."
								value={alasan}
								onChange={(e) => setAlasan(e.target.value)}
							/>
						</div>
					) : (
						<></>
					)
				}
			/>
		</>
	);
}
