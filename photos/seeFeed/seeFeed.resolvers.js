import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Query: {
        // 상대방의 팔로워 목록에 내 아이디가 있는 유저들의 photo를 찾는거임
        // 그러면 그 상대방들이 올린 사진만 보여지겠지?
        // 그리고 최근에 올린 게시물이 제일 상단에 올려지길 원하니까 orderby로 필터를 걸어주고
        // 생성된 날짜를 내림차순으로 진행하면 되겠네?
        seeFeed: protectedResolver((_, { offset }, { loggedInUser }) =>
            client.photo.findMany({
                take: 2,
                skip: offset,
                where: {
                    OR: [
                        { user: { followers: { some: { id: loggedInUser.id } } } },
                        { userId: loggedInUser.id },
                    ],
                },
                orderBy: { createdAt: "desc" },
            })
        ),
    }
}