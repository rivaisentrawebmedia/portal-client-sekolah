import dayjs from "dayjs";
import { Facebook, Mail, PhoneCall } from "lucide-react";

export function Footer() {
	return (
		<footer className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#123b0f] p-4 md:px-24 text-sm text-white">
			<p className="text-center md:text-left opacity-90">
				© {dayjs().locale("id").format("YYYY")} Presensi Online. All rights
				reserved. Powered by Avnet.id
			</p>

			<div className="hidden md:flex items-center gap-3">
				<div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-[#2769CD]">
					<Facebook size={16} />
				</div>
				<div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-[#0E874E]">
					<PhoneCall size={16} />
				</div>
				<div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-[#CD2738]">
					<Mail size={16} />
				</div>
			</div>
		</footer>
	);
}
