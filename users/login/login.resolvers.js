// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 메소드가 뭔지 궁금하면 메소드에 마우스를 갖다대봐!
export default {
    Mutation: {
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
            const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            return { ok: true, token }
        },
    },
};

/*
    12번째 줄
    user를 찾을 때는 첫번째로 올바른 username을 입력했는지 찾아야한다.

    13번째 줄
    만약 올바른 username을 입력하지 않았다면 바로 error를 발생해서 차단시켜 버려야 한다.

    17번째 줄
    올바른 username을 입력했다면 바로 올바른 password인지 확인해야 된다.
    이것은 bcrypt의 compare메소드를 통해서 알아볼 수 있으면, 입력된 Password가 User의 password와 맞는지 확인한다.
    확인하는 방법은 현재 입력한 password를 hashing했을 때의 값과 DB에 저장된 User의 password와 일치하면 통과한다.

    23번째 줄
    token에는 개인정보를 넣어서는 안된다. 그래서 여기서는 조합을 user의 id와 .env에 명시한 SECRET_KEY로 조합한다.
    혹시나 SECRET_KEY를 만들기 힘들다면 https://randomkeygen.com/ 를 방문하면 다양한 키를 볼 수 있다.
    이 token을 항상 백엔드에 보내줘야 백엔드는 현재 접속한 user가 누군지 확인할 수 있다.
*/
