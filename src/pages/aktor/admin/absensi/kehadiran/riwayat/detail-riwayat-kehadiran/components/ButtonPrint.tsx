import { FaPrint } from "react-icons/fa";

export function ButtonPrint() {
	return (
		<>
			<button
				type="button"
				disabled
				className="bg-[#2769CD] p-1.5 rounded-md text-white"
			>
				<FaPrint />
			</button>
		</>
	);
}
