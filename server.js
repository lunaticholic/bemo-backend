// dotenv를 불러들이면서 dotenv의 config 메서드를 실행시킨다는 아주 매우 중요한 의미
require("dotenv").config();

// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";
import express from "express";
import logger from "morgan";

// 서버를 실행할 때 이 녀석들을 데리고 서버를 실행하거라고 알려주는 녀석
const apollo = new ApolloServer({ 
    typeDefs, resolvers,
    context: async (ctx) => {
        if (ctx.req) {
            return {
                loggedInUser: await getUser(ctx.req.headers.token),
            };
            } else {
            const {
                connection: { context },
            } = ctx;
            return {
                loggedInUser: context.loggedInUser,
            };
        }
    },
    subscriptions: {
        onConnect: async ({ token }) => {
            console.log(token);
            if (!token) {
                throw new Error("You can't listen.");
            }
            const loggedInUser = await getUser(token);
            return {
                loggedInUser,
            };
        },
    },
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

// 이 과정을 통해서 우리는 서버한테 지속적인 명령을 보낼 수 있고 서버를 사용할 수 있게 됨
const app = express();
// 앞으로 app을 실행할 때마다 로그를 기록할 것이다. 그것도 터미널에서 일정한 시간 간격을 두고 말이다.
app.use(logger("dev"));
// 혹시 로컬 서버에 있는 폴더에 저장된 파일(여기서는 사진이겠지?)을 보고싶다면?
// express.static안에는 폴더명만 집어넣으면 됨, URL경로랑은 전혀 상관없디요
app.use("/static", express.static("uploads"));

apollo.applyMiddleware({ app });

// 서버가 작동하는지 확인하는 가장 간단한 방법
// port 뒤에는 callback을 통해 터미널에 서버가 실행된다면 이 메세지를 출력하라고 보여주는 것임
app.listen({port:PORT}, () => {
    console.log(`🎺 http://localhost:${PORT}/ 주소가 서버로 작동하고 있어요! HELL YEAH 😀` )
})