// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        editProfile: async (_, { username, email, password: newPassword }, { token }) => {
            const { id } = await jwt.verify(token, process.env.SECRET_KEY);
            // console.log(verifiedToken);
            
            let uglyPassword = null;
            if ( newPassword ) {
                uglyPassword = await bcrypt.hash(newPassword, 10)
            }

            const updateUser = await client.user.update({ where: { id }, data: { username, email, ...(uglyPassword && {password: uglyPassword}) } })
            if (updateUser.id) {
                return { ok: true }
            } else {
                return { ok: false, error: "PROFILE을 수정하지 못했습니다." }
            }
        }
    }
}

/*
    9번째 줄
    Profile을 수정할 때 어떤 데이터들을 보내야 될까?
    그 점을 고려하는게 1번째 목적이고
    두번째는 password는 반드시 hashing된 password가 저장되어야 한다는 것을 기억해야 한다.

    10번째 줄
    이 토큰이 변경되지 않은 순수하게 우리가 만들었다는걸 확인해야 된다.
    이 토큰 안에는 user의 id가 담겨있다는것을 알 수 있다. 못믿겠으면 console.log로 찍어보셈.
    이 안의 id값을 어디로 넘겨주냐면 18번째 줄의 id로 넘겨줄거임
        -차후에 수정된 질문: token을 어떻게 받을건데? 바로 http header에 넣어서 받을거임
        

    15번째 줄
    그래서 그 점을 고려해서 bcrypt를 불러와서 다시 hashing한 다음 저장해야 한다.

    18번째 줄
    uglyPassword에 값이 있다면 password에는 uglyPassword값을 할당하여 저장할 것이다.

    19번째 if문
    당연한거다. 13번째 줄이 정확하다면 ok에는 true가 담겨 Profile이 수정될 것이고
    그렇지 않다면 ok에는 false가, error에는 메세지가 출력될 것이다.
*/