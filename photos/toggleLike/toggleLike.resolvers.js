// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        // 사진에 대한 좋아요 버튼을 눌러 기능을 사용하려면 로그인된 유저만 사용을 해야 하니 protectedResolver 형태로 만들어야 한다.
        toggleLike: protectedResolver(async(_, { id }, { loggedInUser }) => {
            const photo = await client.photo.findUnique({ where: { id } })
            if (!photo) { return { ok: false, error: "좋아요를 표시할 사진을 찾을 수 없습니다." } }

            // 아마 중간에 비슷한 코드를 자주 사용할거 같은데 그럴 때는?
            const likeWhere = { photoId_userId: { userId: loggedInUser.id, photoId: id } }

            // 우선 사진을 찾고, 그 사진에 좋아요가 이미 있는지를 확인하고 좋아요가 없다면 새로운 좋아요를 만들면 됨
            const like = await client.like.findUnique({ where: likeWhere })
            // 만약 사용자가 이미 좋아요 버튼을 클릭한 상태라면? 없애면 됨
            if (like) {
                await client.like.delete({ where: likeWhere })
            } else {
                await client.like.create({ data: { user: { connect: { id: loggedInUser.id} }, photo: { connect: { id: photo.id } } } })
            }
            return { ok: true }
        })
    }
}
