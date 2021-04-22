// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        // arguments는 typeDefs에 정의해준 변수 이름, context에는 누굴 찾아야 될지 알아야 되니 loggedInUser를 정의해준다
        followUser: protectedResolver(async(_, { username }, { loggedInUser }) => {
            const ok = await client.user.findUnique({ where: { username } })
            if (!ok) {
                return {
                    ok: false,
                    error: "현재 해당되는 user를 찾을 수 없는 관계로 팔로우를 할 수 없습니다."
                }
            }
            await client.user.update({
                where: { id: loggedInUser.id }, // 우리는 loggedInUser가 누굴 follow 하는지를 update해줘야 된다
                data: { following: { connect: { username } } } // connect라는건 말 그대로 다른 user를 연결해주는 역할을 한다. 참고로 연결하는 필드값은 unique한 필드값만 허용된다
            })
            return { ok: true }
        })
    }
}