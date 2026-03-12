import { MoreActions } from "@/components/layout/more";
import { useSession } from "@/core/actions/auth/session.action";
import type { User } from "@/core/contracts/users";
import { ToggleUserAction } from "./toggle-user-action";
import { UpdateMoreAction } from "./update-more-action";

export function UserRowActions({ row }: { row: User }) {
	const { data } = useSession();
	const isCurrentUser = data?.user?.id === row.id;

	return (
		<MoreActions>
			<UpdateMoreAction data={row} />

			<ToggleUserAction
				id={row.id}
				variant={row.is_deactivated ? "restore" : "disable"}
				disabled={isCurrentUser}
			/>
		</MoreActions>
	);
}
