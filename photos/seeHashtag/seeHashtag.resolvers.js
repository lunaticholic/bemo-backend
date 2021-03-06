// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client";

export default {
    Query: {
        // 누구나 사용할 수 있는 hashtag이므로 public으로 만들어 놓는다.
        seeHashtag: (_, { hashtag }) => client.hashtag.findUnique({ where: { hashtag } })
    }
}

// 해당 hashtag에 등록된 사진 배열과
// 등록된 사진의 갯수