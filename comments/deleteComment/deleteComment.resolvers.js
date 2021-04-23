import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        deleteComment: protectedResolver(async(_, { id }, { loggedInUser } ) => {
            const comment = await client.comment.findUnique({
                where: { id },
                select: { userId: true }
            })
            if (!comment) {
                return { ok: false, error: "삭제할 댓글을 찾을 수 없습니다."}
            } else if ( comment.userId !== loggedInUser.id ) {
                return { ok: false, error: "해당 댓글을 작성한 사용자가 아니므로 삭제할 수 없습니다."}
            } else {
                await client.comment.delete({ where: { id } })
                return {ok: true}
            }
        })
    }
}