import client from "../../client";

export default {
    Query: {
        // 팔로워를 찾는 방법은 2가지가 있음
        // 여기서 구현한 방식은 cursor based pagination 방식임
        // curosr는 우리가 데이터베이스로 보내는 일종의 신호역할을 하는 녀석임! '여기가 지금 마지막 결과야'
        seeFollowing: async (_, { username, lastId }) => {
            // 실제 팔로잉중인 유저가 존재하는지 확인하는 작업
            const ok = await client.user.findUnique({ where: { username }, select: { id: true } })
            if (!ok) { return { ok: false, error: "현재 팔로우 중인 사용자가 없습니다." } }

            // 현재 사용자의 팔로워를 찾기 위해 username으로 검색한 후, 그 유저를 팔로우 하는 사람들을 찾으면 된다.
            const following = await client.user.findUnique({ where: { username } }).following({ take: 5, skip: lastId ? 1 : 0, ...(lastId && {cursor: {id: lastId}}) }); // 어디에 있는지와 unique한 property에 대한 정보를 가지고 있는 녀석임

            return { ok: true, following }
        }
    }
}