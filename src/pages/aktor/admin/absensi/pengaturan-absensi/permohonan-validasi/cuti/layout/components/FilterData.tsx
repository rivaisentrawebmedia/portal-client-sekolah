import { LimitSelect } from "@/components/common/limitSelect";
import { SearchInput } from "@/components/common/searchInput";

import {
	ButtonDiajukan,
	ButtonDibatalkan,
	ButtonDraft,
} from "../../detail-permohonan-cuti/components";

export function FilterData({
	statusParams,
	setIsShow,
	checkedPool,
	loading,
	setCheckedPool,
	setStatus,
}: {
	statusParams: string;
	setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
	checkedPool: string[];
	loading: boolean;
	setCheckedPool: React.Dispatch<React.SetStateAction<string[]>>;
	setStatus: React.Dispatch<
		React.SetStateAction<
			"draft" | "diajukan" | "disetujui" | "ditolak" | "dibatalkan" | undefined
		>
	>;
}) {
	return (
		<>
			<div className="flex md:justify-between md:flex-row flex-col md:items-end gap-4 border bg-white">
				<div className="flex gap-4 w-full">
					<LimitSelect
						pageKey={`page-${statusParams}`}
						limitKey={`limit-${statusParams}`}
					/>
					<SearchInput
						pageKey={`page-${statusParams}`}
						searchKey={`search-${statusParams}`}
					/>
				</div>
				{statusParams === "draft" ? (
					<ButtonDraft
						checkedPool={checkedPool}
						loading={loading}
						setCheckedPool={setCheckedPool}
						setIsShow={setIsShow}
						setStatus={setStatus}
					/>
				) : statusParams === "diajukan" ? (
					<ButtonDiajukan
						checkedPool={checkedPool}
						loading={loading}
						setCheckedPool={setCheckedPool}
						setStatus={setStatus}
						setIsShow={setIsShow}
					/>
				) : statusParams === "dibatalkan" ? (
					<ButtonDibatalkan
						checkedPool={checkedPool}
						loading={loading}
						setCheckedPool={setCheckedPool}
						setStatus={setStatus}
						setIsShow={setIsShow}
					/>
				) : (
					<></>
				)}
			</div>
		</>
	);
}
