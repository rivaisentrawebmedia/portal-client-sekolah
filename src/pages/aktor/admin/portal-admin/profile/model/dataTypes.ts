import type {
	GantiPasswordFormValues,
	ResetPasswordFormValues,
} from "./dataSchema";

export type Profile = {
	id: string;
	email: string;
	username: string;
	nama: string;
	photo: string | null;
	nama_sekolah: string;
	sekolah_id: string;
	photo_sekolah: string | null;
	is_superadmin: boolean;
};

export type UpdatePayload = {
	data: GantiPasswordFormValues;
};

export type UpdateResetPasswordPayload = {
	data: ResetPasswordFormValues;
};
