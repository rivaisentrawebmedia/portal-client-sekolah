import { XCircle } from "lucide-react";

export function ButtonTolak({
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
		</>
	);
}
