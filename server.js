// dotenv를 불러들이면서 dotenv의 config 메서드를 실행시킨다는 아주 매우 중요한 의미
require("dotenv").config();

// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser } from "./users/users.utils";

// 서버를 실행할 때 이 녀석들을 데리고 서버를 실행하거라고 알려주는 녀석
const server = new ApolloServer({ 
    schema, 
    context: async ({ req }) => {
        return { loggedInUser: await getUser(req.headers.token) }
    }
});
/*
    Profile을 수정하려면 이 곳에서 editProfile쪽으로 token을 보내야 수정하려는 user가 로그인한 user와 동일한지 확인이 가능하다.
    바로 headers에 담긴걸 꺼내려면 req로 호출하면 된다.
    그런데 계속 token을 전달하지 않고 user를 전달하면 어떨까?
    그걸 수행하는게 users.utils.js다

    14번째 줄에 loggedInUser를 명심해라
    앞으로 모든 곳에서 loggedInUser라는 변수가 있다면 이 곳에서 불러오는 것이다.
*/

const PORT = process.env.PORT

// 서버가 작동하는지 확인하는 가장 간단한 방법
server.listen(PORT).then(() => console.log(`🎺 http://localhost:${PORT}/ 주소가 서버로 작동하고 있어요! HELL YEAH 😀` ) );