// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client";

export default {
    Query: {
        // 어떤 사진에 대한 모든 댓글을 조회하는 구문이다.
        // 참고로 뒤에 orderby는 가장 처음 작성된 댓글부터 보여주기 위함이다.
        seePhotoComments: (_, { id }) => client.comment.findMany({ where: { photoId: id }, orderBy: { createdAt: "asc" } })
    }
}