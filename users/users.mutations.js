// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../client";
import bcrypt from "bcrypt";

// 메소드가 뭔지 궁금하면 메소드에 마우스를 갖다대봐!
export default {
    Mutation: {
        createAccount: async (_, { username, email, password }) => {
        try {
            const existingUser = await client.user.findFirst({
            where: { OR: [{ username }, { email }] },
            });
            // console.log(existingUser);

            if (existingUser) {
            throw new Error("현재 사용중인 username입니다. ");
            }

            const uglyPassword = await bcrypt.hash(password, 10);
            // console.log(uglyPassword);

            return client.user.create({
            data: { username, email, password: uglyPassword },
            });
        } catch (e) {
            return e;
        }
        },
        login: async (_, { username, password }) => {
        // user를 찾을때는 args.username으로 찾는다.
        const user = await client.user.findFirst({ where: { username } })
        if (!user) {
            return { ok: false, error: "USER를 찾을 수 없습니다."}
        }
        // user를 찾으면 password가 args.password와 같은지 확인하고
        const passwordOk = await bcrypt.compare(password, user.password);
        // console.log(passwordOk);
        if (!passwordOk) {
            return { ok: false, error: "PASSWORD가 잘못되었습니다."}
        }
        // 둘다 맞다면 token을 발행해서 넘겨줄거임
        },
    },
};

/*
    10번째 줄: 데이터베이스에 같은 username이나 같은 email이 있는지 반드시 선제검사를 통해 걸러내야된다야

    13번째 줄
    만약 없다면, 정보를 저장하는데 password는 hash 형태로 저장할거야
    hash function은 단방향으로만 정보를 바꿀수 있는 아주 좋은 녀석이라서!!
    뒤에 10이 들어가는 구역을 salt(또는 papper)라고 부르는데 hash가 끝난 후에 무작위로 추가되는 텍스트임

    16번째 줄
    그러고 모두 다 잘된다면 user를 return 할거야

    26번째 줄
    try 구문에서 에러가 발생하면 어디로 넘어갈까? 당근 catch로 넘어간다

    32번째 줄
    user를 찾을 때는 첫번째로 올바른 username을 입력했는지 찾아야한다.
    33번째 줄
    만약 올바른 username을 입력하지 않았다면 바로 error를 발생해서 차단시켜 버려야 한다.
    36번째 줄
    올바른 username을 입력했다면 바로 올바른 password인지 확인해야 된다.
    이것은 bcrypt의 compare메소드를 통해서 알아볼 수 있으면, 입력된 Password가 User의 password와 맞는지 확인한다.
    확인하는 방법은 현재 입력한 password를 hashing했을 때의 값과 DB에 저장된 User의 password와 일치하면 통과한다.
*/
