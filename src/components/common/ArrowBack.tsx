import { JokoArrowBack } from "@/assets/icons/JokoArrowBack";
import { useNavigate } from "react-router-dom";

export function ArrowBack({ link, title }: { title: string; link: string }) {
	const navigate = useNavigate();
	return (
		<button
			onClick={() => {
				if (link) {
					navigate(link);
				}
			}}
			type="button"
			className="flex items-center gap-2.5 w-fit"
		>
			<div className="flex border border-[#A09EDA] bg-[#F5F5FF] rounded-full items-center justify-center w-10 h-10">
				<JokoArrowBack />
			</div>
			<p className="text-2xl text-[#162259] font-medium">{title}</p>
		</button>
	);
}
