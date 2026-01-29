import AxiosClient, { type PaginatedResponseByID } from "@/provider/axios";
import type { KopSurat } from "./dataTypes";
import type { KopSuratFormValues } from "./dataSchema";

export const getKopSurat = async (): Promise<
	PaginatedResponseByID<KopSurat>
> => {
	const res = await AxiosClient.get("/surat/kop-surat");

	return res.data;
};

export async function postKopSurat(payload: KopSuratFormValues) {
	const res = await AxiosClient.post("/surat/kop-surat", payload);
	return res.data;
}
