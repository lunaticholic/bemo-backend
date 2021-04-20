// 우리가 찾고 싶은 파일을 graphql-tools 녀석이 찾아오길 매우 원하시나요?
// loadFileSync를 사용하면 So cool
// **는 모든 폴더를 의미, *는 어떤 파일을 의미, {} 안에 다양한 것을 넣어주면 하나로 묶어버릴거라는 의미
// 7번째 줄에 파일을 찾을 때 {} 안에 공백이 있으면 안된다! 공백하면 나처럼 멍청이된다! (createAccount 할 때에 null 값이 반환됨)
import { loadFilesSync, makeExecutableSchema, mergeTypeDefs, mergeResolvers } from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;

/*
    8번째 줄
    보다 더 정확한 Architecture를 위해 파일을 세분화 할 필요성도 있지만 너무나 큰 세분화는 필요가 없다.
    그래서 queries와 mutations를 하나로 합쳐 resolvers라는 파일로 만들어준다.
*/