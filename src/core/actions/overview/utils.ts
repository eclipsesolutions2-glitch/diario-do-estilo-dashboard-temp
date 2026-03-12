import type { Overview } from "@/core/contracts/overview";
import { axios } from "@/lib/axios";

export const overviewStatsFn = async (): Promise<Overview> => {
	return (await axios("/admin/dashboard/overview")).data;
};
