// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import jwt from "jsonwebtoken";
import client from "../client";

// 이 코드를 작성한 이유는 어디서나 불러올 수 있게 만들려고 했다.
// 계속 작성해서 니 손 아프게 할거 아니면 여기다가 작성하고 그냥 불러오기해라
export const getUser = async(token) => {
    try {
        if (!token) { return null }
        const { id } = await jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifiedToken);

        const user = await client.user.findUnique({ where: { id }});

        if (user) { return user; } else { return null }
    } catch {
        return null;
    }
}

/*
    10번째 줄
    이 토큰이 변경되지 않은 순수하게 우리가 만들었다는걸 확인해야 된다.
    이 토큰 안에는 user의 id가 담겨있다는것을 알 수 있다. 못믿겠으면 console.log로 찍어보셈.
    이 안의 id값을 어디로 넘겨주냐면 18번째 줄의 id로 넘겨줄거임
        -차후에 수정된 질문: token을 어떻게 받을건데? 바로 http header에 넣어서 받을거임
            근데 어떻게 받을거냐면 바로 server.js에 보면 친절하게 설명되어 있음
*/

export const protectResolver = ( user ) => {
    if ( !user ) {
        return {
            ok: false,
            error: "로그인을 하신 후 수정하시기 바랍니다."
        }
    }
}

/*
    32번째 줄
    로그인되어 있지 않은 유저가 접근하려고 하면 에러메세지를 발급해주자! 얌마!
    그리고 그 이후에 있는 코드들을 실행시키지 못하게 해줘야 되는데, 앞으로 모든 resolvers에서 protectResolvers를 사용해야 된다.
*/