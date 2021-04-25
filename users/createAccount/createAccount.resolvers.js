// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client";
import bcrypt from "bcrypt";

// 메소드가 뭔지 궁금하면 메소드에 마우스를 갖다대봐!
export default {
    Mutation: {
        createAccount: async (
            _,
            { username, email, password }
        ) => {
            try {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [ { username }, { email } ],
                    },
                });
                if (existingUser) { throw new Error("USERNAME 혹은 EMAIL이 사용중입니다.") }
                const uglyPassword = await bcrypt.hash(password, 10);
                await client.user.create({
                    data: { username, email, password: uglyPassword },
                });
                return {
                    ok: true,
                };
            } catch (e) {
                return {
                    ok: false,
                    error: "계정을 생성할 수 없습니다.",
                };
            }
        },
    },
};

/*
    9번째 줄: 데이터베이스에 같은 username이나 같은 email이 있는지 반드시 선제검사를 통해 걸러내야된다야

    11번째 줄
    만약 없다면, 정보를 저장하는데 password는 hash 형태로 저장할거야
    hash function은 단방향으로만 정보를 바꿀수 있는 아주 좋은 녀석이라서!!
    뒤에 10이 들어가는 구역을 salt(또는 papper)라고 부르는데 hash가 끝난 후에 무작위로 추가되는 텍스트임

    14번째 줄
    만약 username이 이미 존재한다면 에러를 발생해서 알려준다.

    19번째 줄
    그러고 모두 다 잘된다면 user를 return 할거야

    20번째 줄
    try 구문에서 에러가 발생하면 어디로 넘어갈까? 당근 catch로 넘어간다

*/
