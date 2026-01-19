import LoginBg from "@/assets/images/bg-login.jpg";
import { Separator } from "@/components/ui/separator";
import type { ReactNode } from "react";
import { FaGraduationCap } from "react-icons/fa";

export default function AuthLayout({
	children,
	description,
}: {
	description: string;
	children: ReactNode;
}) {
	return (
		<div className="relative h-screen w-full text-[#162259]">
			<img
				src={LoginBg}
				className="w-full h-full"
				alt="Login Background"
				loading="eager"
			/>
			<div
				className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
				style={{
					background: "#16225999",
					backdropFilter: "blur(1px)",
				}}
			>
				<div className="w-11/12 flex flex-col gap-3 bg-white md:w-[500px] rounded-lg p-4">
					<div className="flex items-center justify-center gap-2 text-xl">
						<FaGraduationCap />
						<p>Manajemen Sekolah</p>
					</div>
					<Separator />
					<p className="text-[#646464]">{description}</p>
					{children}
				</div>
			</div>
		</div>
	);
}
