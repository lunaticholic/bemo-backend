// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import { gql } from "apollo-server";

export default gql`
    type Query {
        seePhoto(id: Int!): Photo
    }
`;
// 사진을 못찾을 수도 있으니 사진에 대한 id는 필수항목설정을 하지 않는다.