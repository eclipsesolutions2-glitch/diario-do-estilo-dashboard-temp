import { useQuery } from "@tanstack/react-query";
import { sessionFn } from "./utils";

export const useSession = () => {
	const query = useQuery({
		queryKey: ["session-user"],
		queryFn: sessionFn,
	});
	return { ...query, data: query.data?.data };
};
