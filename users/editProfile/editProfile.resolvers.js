// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client"
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

const resolverFn = async (_, { username, email, password: newPassword , bio}, { loggedInUser }) => {
    // console.log(loggedInUser)

    let uglyPassword = null;
    if ( newPassword ) {
        uglyPassword = await bcrypt.hash(newPassword, 10)
    }

    const updateUser = await client.user.update({ where: { id: loggedInUser.id }, data: { username, email, bio, ...(uglyPassword && {password: uglyPassword}) } })
    if (updateUser.id) {
        return { ok: true }
    } else {
        return { ok: false, error: "PROFILE을 수정하지 못했습니다." }
    }
}

export default {
    Mutation: {
        editProfile: protectedResolver(resolverFn)
    }
}
/*
    7번째 줄
    Profile을 수정할 때 어떤 데이터들을 보내야 될까?
    그 점을 고려하는게 1번째 목적이고
    두번째는 password는 반드시 hashing된 password가 저장되어야 한다는 것을 기억해야 한다.

    12번째 줄
    그래서 그 점을 고려해서 bcrypt를 불러와서 다시 hashing한 다음 저장해야 한다.

    15번째 줄
    uglyPassword에 값이 있다면 password에는 uglyPassword값을 할당하여 저장할 것이다.

    16번째 if문
    당연한거다. 13번째 줄이 정확하다면 ok에는 true가 담겨 Profile이 수정될 것이고
    그렇지 않다면 ok에는 false가, error에는 메세지가 출력될 것이다.

    24번째 줄
    protectedResolver를 호출하게 되면 어떤 현상이 발생하는냐?
    여기에 user가 로그인 되어 있는지 안되어 있는지 선행을 시작하게 됨. 로그인 안되어 있으면? 못하는거지 뭐
*/