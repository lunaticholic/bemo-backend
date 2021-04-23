import { gql } from "apollo-server-core";

// GraphQL은 반대로 required를 지정할 때 느낌표로 지정해야됨, 반드시 Prisma와 맞춰줘야 한다
// 명심할 사항 하나, 파일을 typeDefs로 새로 만들어줄 때에는 아래의 graphql은 반드시 export default 되어야 한다는 솨실!
// 명심할 사항 둘, user는 절대로 DB에러를 보게 해서는 안된다. 만약 보인다? 그건 니가 멍청한거고 멍청한거임! 욕먹어도 싸다!
export default gql`
    type Mutation {
        createAccount(
            username: String!
            email: String!
            password: String!
        ): MutationResponse!
    }
`;

/* 
    9번째 줄
    Account를 만들기 위해서는 다음과 같은 정보를 입력받아야 한다.
    그리고 나면 CreateAccountResult에서 정상적으로 진행되는지 아닌지 알려준다.
    결과에 대해서는 ok에 true 혹은 false로 나타나며, false일 경우 error에 그 메세지가 출력되게 된다.
*/