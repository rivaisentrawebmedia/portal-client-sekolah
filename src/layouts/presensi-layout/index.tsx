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
			<div className={clsx("flex min-h-svh w-full flex-col font-sans")}>
				<HeaderPresensiDesa />

				<NavigasiPresensiDesa menu={data} loading={loading} />
				<MobileNavigasiPresensiDesa menu={data} />
				<div
					className="flex flex-col w-full flex-1"
					style={{ lineHeight: "130%" }}
				>
					<div className="flex flex-1 p-4 md:px-24">
						<Outlet />
					</div>
					<Footer />
				</div>
			</div>
		</ErrorBoundary>
	);
}
