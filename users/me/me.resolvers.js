import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Query: {
        // 현재 로그인되어 있는 유저가 나인지 아닌지 확인하는 작업
        // 그 말은 토큰이 정상적으로 발급되었는지 확인
        me: protectedResolver((_, __, { loggedInUser }) => client.user.findUnique({ where: { id: loggedInUser.id } }))
    }
}