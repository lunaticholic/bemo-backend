// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import { gql } from "apollo-server";

// 사진을 지우려면? 그 사진의 id만 있으면 지우는 작업을 할 수 있겠네?
export default gql`
    type Mutation {
        deletePhoto(id: Int!): MutationResponse!
    }
`;