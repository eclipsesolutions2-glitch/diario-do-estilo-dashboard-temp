export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	role: UserRole;
	bio?: string;
	avatar_url?: string;
	can_upload_avatar: boolean;
	is_deactivated: boolean;
}

export type UserRole = "admin" | "editor" | "reader";

export interface UserProfile extends Omit<User, "can_upload_avatar"> {
	bio: string;
	avatar_url?: string;
}
