// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        // 사진을 삭제하려면? 그 사진의 id값이 필요할거고, 대신 로그인한 유저가 자기 자신의 사진만 삭제할 수 있어야겠네?
        deletePhoto: protectedResolver(async(_, { id }, { loggedInUser }) => {
            const photo = await client.photo.findUnique ({ where: { id }, select: { userId: true } })
            if (!photo) {
                return { ok: false, error: "삭제할 사진을 찾을 수 없습니다." }
            } else if ( photo.userId !== loggedInUser.id ) {
                return { ok: false, error: "현재 삭제하려는 사진은 해당 사용자의 사진이 아닙니다." }
            } else {
                await client.photo.delete({ where: { id } })
                return { ok: true }
            }
        })
    }
}