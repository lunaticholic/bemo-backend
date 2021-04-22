import client from "../../client"

export default {
    Query: {
        // 팔로워를 찾는 방법은 2가지가 있음
        seeFollowers: async(_, { username, page }) => {
            // 현재 사용자의 팔로워를 찾기 위해 username으로 검색한 후, 그 유저를 팔로우 하는 사람들을 찾으면 된다.
            // 뒤의 수식에 (page-1)*5를 해준 이유는 한페이지에 5명의 팔로워만 보여주기 위해서임
            const followers = await client.user.findUnique({ where: { username } }).followers({ take: 5, skip: (page - 1) * 5 });
            // console.log(aFollowers);
            return { ok: true, followers }

            // 현재 로그인된 사용자가 팔로우 리스트에 있는 user를 찾을거임
            // const bFollowers = await client.user.findMany({ where: { following: { some: { username } } } })
        }
    }
}