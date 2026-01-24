import { Send } from "lucide-react";

export function ButtonAjukanIzin({
	checkedPool,
	loading,
	setIsShow,
	setStatus,
	setCheckedPool,
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
					setStatus("diajukan");
					setCheckedPool(checkedPool);
					setIsShow(true);
				}}
				disabled={loading || checkedPool?.length <= 0}
				className="flex justify-center text-nowrap disabled:bg-[#f1f5f9]/50 items-center gap-2 px-3 rounded-md py-1.5 bg-[#f1f5f9] border border-[#2769cd] text-[#2769cd]"
			>
				<Send size={14} />
				Ajukan Izin ({checkedPool?.length})
			</button>
		</>
	);
}
