// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        // 작성한 댓글에 대한 수정도 당연히 할 수 있게 해줘야 겠지?
        // 그 작성한 댓글은 작성한 사람만 할 수 있고,
        // 로그인이 되어 있어야만 수정할 수 있어야겠쥐?
        editComment: protectedResolver(
            async (_, { id, payload }, { loggedInUser }) => {
                const comment = await client.comment.findUnique({ where: { id }, select: { userId: true } });
                if (!comment) {
                    return { ok: false, error: "수정할 댓글을 찾을 수 없습니다." };
                } else if (comment.userId !== loggedInUser.id) {
                    return { ok: false, error: "현재 댓글을 작성한 사용자가 아니므로 수정할 수 없습니다." };
                } else {
                    await client.comment.update({ where: { id }, data: { payload } });
                    return { ok: true };
                }
            }
        ),
    }
}