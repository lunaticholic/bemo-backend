// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client";

export default {
    Query: {
        // 사진은 누구나 찾을 수 있어야 하기 때문에 protectedResolver로 보호하지 않는다.
        seePhoto: (_, { id }) => client.photo.findUnique({ where: { id } })
    }
}