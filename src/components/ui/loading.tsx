import Loading from "../assets/images/loading-mona.gif";

export function LoadingMona() {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-32">
			<img src={Loading} alt="loading" className="w-[18rem]" />
			<p className="text-[#484f58]">Sedang memuat data ...</p>
		</div>
	);
}
