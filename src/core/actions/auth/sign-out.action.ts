import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { destroyCookie } from "nookies";
import { toast } from "sonner";
import { signOutFn } from "./utils";

export const useSignOut = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: signOutFn,
		onSuccess() {
			destroyCookie(null, "dds-auth.dashboard-session");
			toast.success("Sessão terminada com sucesso");

			navigate({
				href: "/sign-in",
				replace: true,
			});
		},
	});
};
