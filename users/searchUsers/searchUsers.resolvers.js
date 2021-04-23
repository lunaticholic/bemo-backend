// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client"

export default {
    Query: {
        // 어떠한 user를 찾을 때 fullname으로 찾게 되지만 keyword로 찾을 수 있다는 것을 명심해야 한다.
        searchUsers: async(_, { keyword }) => client.user.findMany({ where: { username: { startsWith: keyword.toLowerCase() } } })
    }
}