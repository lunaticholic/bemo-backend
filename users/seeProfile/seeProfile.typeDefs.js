import { gql } from "apollo-server";

// GraphQL은 반대로 required를 지정할 때 느낌표로 지정해야됨, 반드시 Prisma와 맞춰줘야 한다
// 명심할 사항 하나, 파일을 typeDefs로 새로 만들어줄 때에는 아래의 graphql은 반드시 export default 되어야 한다는 솨실!
// 명심할 사항 둘, user는 절대로 DB에러를 보게 해서는 안된다. 만약 보인다? 그건 니가 멍청한거고 멍청한거임! 욕먹어도 싸다!
export default gql`
    type Query {
        seeProfile(username: String!): User
    }
`;