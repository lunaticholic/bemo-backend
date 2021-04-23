// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import { gql } from "apollo-server";

// GraphQL은 반대로 required를 지정할 때 느낌표로 지정해야됨, 반드시 Prisma와 맞춰줘야 한다
// 명심할 사항 하나, 파일을 typeDefs로 새로 만들어줄 때에는 아래의 graphql은 반드시 export default 되어야 한다는 솨실!
// 명심할 사항 둘, user는 절대로 DB에러를 보게 해서는 안된다. 만약 보인다? 그건 니가 멍청한거고 멍청한거임! 욕먹어도 싸다!
export default gql`
    type Query {
        searchUsers(keyword: String!): [User]
    }
`;
// user를 찾을 때 fullname을 알고 있으면 좋겠지만 fullname을 모른다면? 어떻게 검색해야 될까?
// 바로 해당 keyword를 통해서 찾으면 된다.