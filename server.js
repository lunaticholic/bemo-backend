// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";

/*
    PrismaClient 위에 마우스를 가져다 댄 후 설명문을 보면 좀 개쩌는 부분이 하나 있는데,
    그것은 우리가 migrate했던 스키마의 형태로 예제를 보여준다는 것임
*/
const client = new PrismaClient();

/*
    서버에서 뭔가를 실행하기 위한 쿼리문을 만드는 녀석
    GraphQL문으로 작성되어 있음
    아마 Prisma를 보다가 GraphQL을 보면 반대로 되어 있는 구문 하나를 발견할 수 있음
    GraphQL은 반대로 required를 지정할 때 느낌표로 지정해야됨, 반드시 Prisma와 맞춰줘야 한다
*/
const typeDefs = gql`
    type Movie {
        id: Int!
        title: String!
        year: Int!
        genre: String
        createdAt: String!
        updatedAt: String!
    }
    type Query {
        movies: [Movie]
        movie(id: Int!): Movie
    }
    type Mutation {
        createMovie(title: String!, year: Int!, genre: String): Movie
        deleteMovie(id: String!): Boolean
    }
`;

// 서버에서 실제로 뭔가를 보여주는 녀석
const resolvers = {
    Query: {
        movies: () => client.movie.findMany(),
        movie: (_, { id }) => ({ title: "Hello", year: 2020 }),
    },
    // _는 root를 적는것과 똑같다
    // args에는 resolvers의 query에서 오는 값을 반환한다.
    Mutation: {
        createMovie: (_, { title, year, genre }) => 
            client.movie.create({
                data: {
                    title,
                    year,
                    genre
                },
            }),
        deleteMovie: (_, { id }) => {
            return true;
        },
    },
};

// 서버를 실행할 때 이 녀석들을 데리고 서버를 실행하거라고 알려주는 녀석
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// 서버가 작동하는지 확인하는 가장 간단한 방법
server.listen().then(() => console.log( "http://localhost:4000/ 주소가 서버로 작동하고 있어요! HELL YEAH" ) );