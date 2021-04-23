import client from "../../client";

export default {
    Query: {
        // 누구나 사용할 수 있는 hashtag이므로 public으로 만들어 놓는다.
        seeHashtag: (_, { hashtag }) => client.hashtag.findUnique({ where: { hashtag } })
    }
}

// 해당 hashtag에 등록된 사진 배열과
// 등록된 사진의 갯수