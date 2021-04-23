import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        // 사진에 대한 좋아요 버튼을 눌러 기능을 사용하려면 로그인된 유저만 사용을 해야 하니 protectedResolver 형태로 만들어야 한다.
        toggleLike: protectedResolver(async(_, { id }, { loggedInUser }) => {
            const ok = await client.photo.findUnique({ where: { id } })
            if (!ok) { return { ok: false, error: "좋아요를 표시할 사진을 찾을 수 없습니다." } }

            // 우선 사진을 찾고, 그 사진에 좋아요가 이미 있는지를 확인하고 좋아요가 없다면 새로운 좋아요를 만들면 됨
            // 만약 사용자가 이미 좋아요 버튼을 클릭한 상태라면? 없애면 됨
        })
    }
}