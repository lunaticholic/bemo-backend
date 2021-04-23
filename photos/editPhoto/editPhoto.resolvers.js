// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        // 사진 수정은 로그인중인 사용자만 가능한 작업이므로 protectedResolver를 통해 보호를 해준다.
        editPhoto: protectedResolver( async (_, { id, caption }, { loggedInUser }) => {
            // 수정하고자 하는 사진을 찾아야 하겠지?
            // findFirst는 우리의 기준에 맞는 첫번째 사진을 반환해준다.
            const ok = await client.photo.findFirst({ where: { id, userId: loggedInUser.id } })
            // 유저가 해당 사진의 소유자인지 확인 후 실소유자가 아니면 에러를 보내는 작업을 할거임
            if (!ok) { return { ok: false, error: "사진을 찾을 수 없습니다." } }

            // 사진을 수정했다면 사진을 업데이트하는 작업을 해야된다.
            const photo = await client.photo.update({ where: { id }, data: { caption } })
            console.log(photo)
        })
    }
}