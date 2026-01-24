import { z } from "zod";

export const GantiPasswordSchema = z.object({
	nama: z.string().min(1, "Nama is required"),
	email: z.string().email().min(1, "Email is required"),
});

export type GantiPasswordFormValues = z.infer<typeof GantiPasswordSchema>;

export const ResetPasswordSchema = z
	.object({
		password_lama: z.string().min(1, "Password lama is required"),
		password_baru: z.string().min(1, "Password baru is required"),
		konfirmasi_password_baru: z
			.string()
			.min(1, "Konfirmasi password baru is required"),
	})
	.superRefine((data, ctx) => {
		if (data.password_baru !== data.konfirmasi_password_baru) {
			ctx.addIssue({
				path: ["konfirmasi_password_baru"],
				message: "Konfirmasi password tidak sama dengan password baru",
				code: z.ZodIssueCode.custom,
			});
		}
	});

export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;
