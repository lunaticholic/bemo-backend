// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../client"

export default {
    Photo: {
        // 명심해라. 여기 있는 userId는 현재 resolver의 parent라는 것을 알아야 한다.
        // 실제로 {userId}라고 작성된 저 괄호 안에 parent라고 입력하고 console.log로 찍어보면 알게 될 것이다.
        user: ({ userId }) => { return client.user.findUnique({ where: { id: userId } }) },

        // 현재 사진의 hashtag가 무엇인지 알아보는 구문이다.
        // 어떻게 찾냐면 우리가 현재 찾은 사진의 id를 가지고 있는 hashtag를 찾아내는 것이다
        hashtags: ({ id }) => client.hashtag.findMany({ where: { photos: { some: { id } } } }),

        // 사진에 대한 likes의 갯수도 볼 수 있지 않을까?
        likes: ({ id }) => client.like.count({ where: { photoId: id } }),

        // 사진에 대한 댓글에 대한 갯수도 봐야겠지?
        comments: ({ id }) => client.comment.count({ where: { photoId: id } })
    },
    Hashtag: {
        // 현재 hashtag에 등록된 사진을 확인해야 되는 것도 있네?
        // 물론 page로 나눠서 출력할 수도 있고, 현재 사용자가 로그인되어 있는지도 확인할 수 있음
        photos: ({ id }, { page }, { loggedInUser } ) => { return client.hashtag.findUnique({ where: { id } }).photos() },

        // 현재 hashtag에 등록된 사진의 갯수를 추출하는 코드이다.
        // 현재 아래에 표기된 id를 가진 hashtag가 hashtags 리스트에 포함 되 있는 사진들을 모두 세도록 하는 작업
        totalPhotos: ({ id }) => client.photo.count({ where: { hashtags: { some: { id } } } })
    }
}