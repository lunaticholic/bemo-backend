// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client";

export default {
    Query: {
        // 사진에 좋아요 버튼을 누른 유저를 보여주는건데 select쪽에는 include라는 메소드도 있음
        // select는 말 그대로 받고 싶은 데이터를 선택하고, include는 결과에 relationship을 추가해준다
        seePhotoLikes: async (_, { id }) => {
            const likes = await client.like.findMany({ 
                where: { photoId: id }, select: { user: { select: { username: true }} }
            })
            return likes.map((like) => like.user)
        }
    }
}