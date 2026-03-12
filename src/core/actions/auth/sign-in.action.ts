import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { setCookie } from "nookies";
import { toast } from "sonner";
import { signInFn } from "./utils";

export const useSignIn = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: signInFn,
		onSuccess({ data }) {
			setCookie(null, "dds-auth.dashboard-session", data.token, {
				maxAge: 60 * 60 * 24, // 1 dia
				path: "/",
			});

			toast.success("Login realizado com sucesso");

			navigate({
				href: "/",
				replace: true,
			});
		},
	});
};
