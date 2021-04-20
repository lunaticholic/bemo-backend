import { gql } from "apollo-server";

// GraphQL은 반대로 required를 지정할 때 느낌표로 지정해야됨, 반드시 Prisma와 맞춰줘야 한다
// 명심할 사항 하나, 파일을 typeDefs로 새로 만들어줄 때에는 아래의 graphql은 반드시 export default 되어야 한다는 솨실!
// 명심할 사항 둘, user는 절대로 DB에러를 보게 해서는 안된다. 만약 보인다? 그건 니가 멍청한거고 멍청한거임! 욕먹어도 싸다!
export default gql`
    type LoginResult {
        ok: Boolean!
        token: String
        error: String
    }
    type Mutation {
        login(
            username: String!
            password: String!
        ): LoginResult!
    }
`;

/*
    10번째 줄
    로그인을 진행하기 위해서는 username과 password를 전달받는다.
    그리고 난 후 올바른 진행을 위해 LoginResult에 그 값을 전달하여 로그인을 진행하게 된다.
    로그인이 정상적을 진행된다면 ok에는 true가, token에는 user의 token 값을 발행하게 되며,
    만약 정상적으로 진행되지 않는다면 ok에는 false가, error에는 메세지가 출력된다.
*/