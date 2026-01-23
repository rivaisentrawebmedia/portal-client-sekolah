import clsx from "clsx";
import { ErrorBoundary } from "@/pages/error";
import { useGetMenu } from "../main-layout/hooks";
import {
	HeaderPresensiDesa,
	MobileNavigasiPresensiDesa,
	NavigasiPresensiDesa,
} from "./components";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/footer";

export default function PresensiLayout() {
	const { data, loading } = useGetMenu();

	return (
		<ErrorBoundary>
			<div
				className={clsx(
					"scrollbar flex h-screen w-full flex-col gap-0 overflow-auto bg-[#F5F5F5] font-sans",
				)}
			>
				<HeaderPresensiDesa />

				<NavigasiPresensiDesa menu={data} loading={loading} />
				<MobileNavigasiPresensiDesa menu={data} />
				<div
					className="flex flex-1 flex-col gap-4"
					style={{ lineHeight: "130%" }}
				>
					<div className="flex flex-1">
						<Outlet />
					</div>
					<Footer />
				</div>
			</div>
		</ErrorBoundary>
	);
}
