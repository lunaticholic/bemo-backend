// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import { gql } from "apollo-server";

// 반복해서 사용하고 있는 코들을 하나로 묶어서 고융해준다.
export default gql`
    type MutationResponse {
        ok: Boolean!
        error: String
    }
`;