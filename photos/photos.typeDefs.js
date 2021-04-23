import { gql } from "apollo-server";

export default gql`
    type Photo {
        id: String!
        user: User!
        file: String!
        capion: String
        hashtag: [Hashtag]
        createdAt: String!
        updatedAt: String!
    }
    type Hashtag {
        id: String!
        hastag: String!
        photos: [Photo]
        createdAt: String!
        updatedAt: String!
    }
`;

/*
    type Photo
    사진을 업로드할 때 과연 어떠한 것들이 들어가는지 확인해 볼 필요성이 있다.
    id, createdAt, updatedAt은 당연히 들어가는 것이니까 필수 불가결이고
    유저의 정보, 업로드하려는 파일, 사진에 대한 글, 중간중간 삽입되는 hastag가 있다.

    type Hashtag
    Hashtag와 Photo가 얼마나 자주 상호작용을 하고 있는지 알아야 한다.
    자주인지? 가끔인지? Hashtag와 상호 작용하는 요소들이 Photo 말고도 더 있는지?
    제일 빠르게 생각하려면 두 모델간의 의존성이 매우 높다고 판단이 된다면 같은 모듈 내에 추가해주는 것이 좋다.
    하지만 여기서는 Hashtag가 Photo와돠 상호작용하지만 댓글에도 상호작용하고 있음을 명시해야 한다.

*/