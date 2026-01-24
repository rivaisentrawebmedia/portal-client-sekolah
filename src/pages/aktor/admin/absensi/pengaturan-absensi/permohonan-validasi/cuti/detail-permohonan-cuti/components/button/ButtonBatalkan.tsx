import { AlertCircle } from "lucide-react";

export function ButtonBatalkan({
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
				onClick={() => {
					setStatus("dibatalkan");
					setCheckedPool(checkedPool);
					setIsShow(true);
				}}
				disabled={loading || checkedPool?.length <= 0}
				className="flex justify-center items-center gap-2 text-nowrap px-3 disabled:bg-amber-300 rounded-md py-1.5 bg-amber-500 text-white"
			>
				<AlertCircle size={14} />
				Batalkan ({checkedPool?.length})
			</button>
		</>
	);
}
