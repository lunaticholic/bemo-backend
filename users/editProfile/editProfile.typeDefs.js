import { gql } from "apollo-server";

// GraphQL은 반대로 required를 지정할 때 느낌표로 지정해야됨, 반드시 Prisma와 맞춰줘야 한다
// 명심할 사항 하나, 파일을 typeDefs로 새로 만들어줄 때에는 아래의 graphql은 반드시 export default 되어야 한다는 솨실!
// 명심할 사항 둘, user는 절대로 DB에러를 보게 해서는 안된다. 만약 보인다? 그건 니가 멍청한거고 멍청한거임! 욕먹어도 싸다!
export default gql`
    type Mutation {
        editProfile(
            username: String
            email: String
            password: String
            bio: String
            avatar: Upload
        ): MutationResponse!
    }
`;

/*
    9번째 줄
    Profile을 수정하기 할 때에는 하나만 수정을 할 수가 있기 때문에 required에서 제외시켜준다.
    그리고 난 후 수정을 완료하기 위해서는 MutationResponse에 보내주어 진행하게 한다.
    결과에 대해서는 ok에 true 혹은 false로 나타나며, false일 경우 error에 그 메세지가 출력되게 된다.

    12번째 줄
    Mutation 내부에 Profile을 수정하기 위해서 어떤 값이 있어야 해당 유저인지 알 수 있을까?
    바로 token 값을 이용하면 된다.

    프로필 사진을 올리고 싶다면?
    avatar를 Upload로 설정하면 됨
*/