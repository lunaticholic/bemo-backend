import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        unfollowUser: protectedResolver(async(_, { username }, { loggedInUser } ) => {
            const ok = await client.user.findUnique({ where: { username } })
            if (!ok) {
                return {
                    ok: false,
                    error: "현재 user에 대한 팔로우를 취소하고 싶다면, 먼저 팔로우를 신청한 후 진행하세요."
                }
            }
            await client.user.update({
                where: { id: loggedInUser.id },
                data: { following: { disconnect: { username } } } // 잘보면 방금전의 followUser와 매우 흡사하지만 connect 혹은 disconnect에 따라 나뉘게 된다.
            })
            return { ok: true }
        })
    }
}