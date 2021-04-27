// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        // 사진에 대한 내용을 작성하는 것을 할 수 있는 구문
        createComment: protectedResolver(async(_, { photoId, payload }, { loggedInUser }) => {
            const ok = await client.photo.findUnique({ where: { id: photoId }, select: { id: true } })
            if (!ok) {
                return {
                    ok: false, error: "내용을 작성할 사진을 찾을 수 없습니다."
                }
            }
            // 사진을 발견했고 내용을 작성할 수 있다면 새롭게 만들면 끗남
            const newComment = await client.comment.create({
                data: { 
                    payload, 
                    photo: { connect: { id: photoId } },
                    user: { connect: {id: loggedInUser.id } }
                }
            })
            return { ok: true, id: newComment.id }
        })
    }
}