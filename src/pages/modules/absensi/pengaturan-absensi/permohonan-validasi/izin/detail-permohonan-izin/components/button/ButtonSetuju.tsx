import { CheckCircle } from "lucide-react";

export function ButtonSetuju({
	checkedPool,
	loading,
	setIsShow,
	setCheckedPool,
	setStatus,
}: {
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
		</>
	);
}
