import { z } from "zod";

export const DaftarLokasiSchema = z.object({
	nama: z.string().min(1, "Nama is required"),
	longtitude: z.string().min(1, "Longitude is required"),
	latitude: z.string().min(1, "Latitude is required"),
	radius: z.string().min(1, "Radius is required"),
});

export type DaftarLokasiFormValues = z.infer<typeof DaftarLokasiSchema>;
