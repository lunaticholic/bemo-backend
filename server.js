// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import { ApolloServer, gql } from "apollo-server";

// 서버에서 뭔가를 실행하기 위한 쿼리문을 만드는 녀석
const typeDefs = gql`
    type Query {
        hello: String
    }
`;

// 서버에서 실제로 뭔가를 보여주는 녀석
const resolvers = {
    Query: {
        hello: () => "bebe",
    },
};

// 서버를 실행할 때 이 녀석들을 데리고 서버를 실행하거라고 알려주는 녀석
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// 서버가 작동하는지 확인하는 가장 간단한 방법
server.listen().then(() => console.log("http://localhost:4000/ 주소가 서버로 작동하고 있어요! HELL YEAH"))