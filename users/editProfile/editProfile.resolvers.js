// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client"
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

const resolverFn = async (_, { username, email, password: newPassword , bio, avatar}, { loggedInUser }) => {
    // console.log(loggedInUser)
    // console.log(avatar);
    const { filename, createReadStream } = await avatar;
    const stream = createReadStream();
    let uglyPassword = null;
    console.log(stream);
    if (newPassword) { uglyPassword = await bcrypt.hash(newPassword, 10) }
    const updatedUser = await client.user.update({
        where: {
            id: loggedInUser.id,
        },
        data: { 
            username, email, bio,
            ...(uglyPassword && { password: uglyPassword }),
        }
    });
    if (updatedUser.id) { return { ok: true };
    } else {
        return {
        ok: false,
        error: "Could not update profile.",
        };
    }
};

export default {
    Mutation: {
        editProfile: protectedResolver(resolverFn),
    },
};
/*
    7번째 줄
    Profile을 수정할 때 어떤 데이터들을 보내야 될까?
    그 점을 고려하는게 1번째 목적이고
    두번째는 password는 반드시 hashing된 password가 저장되어야 한다는 것을 기억해야 한다.

    10번째 줄
    Avatar를 통해 불러오는 사진의 정보를 보면 filename, createReadStream이라는 정보가 내장되어 있다.
    그 정보를 가지고 본인의 프로필 사진을 불러오면 된다.

    11번째 줄
    그래서 모든 파일을 stream을 통해서 받아낼 것이다.
    어떤 것을? 사진에 담겨 있는 정보 중 createReadStream이라는 내부의 정보를 불러올것이다.
    참고로 이 createReadStream만 다시 불러오면 엄청나게 많은 정보가 들어있음을 알 수 있다.

    14번째 줄
    그래서 그 점을 고려해서 bcrypt를 불러와서 다시 hashing한 다음 저장해야 한다.

    21번째 줄
    uglyPassword에 값이 있다면 password에는 uglyPassword값을 할당하여 저장할 것이다.

    24번째 if문
    당연한거다. 13번째 줄이 정확하다면 ok에는 true가 담겨 Profile이 수정될 것이고
    그렇지 않다면 ok에는 false가, error에는 메세지가 출력될 것이다.

    35번째 줄
    protectedResolver를 호출하게 되면 어떤 현상이 발생하는냐?
    여기에 user가 로그인 되어 있는지 안되어 있는지 선행을 시작하게 됨. 로그인 안되어 있으면? 못하는거지 뭐
*/

/*
    이 곳의 구문을 실행하려면 Altair를 실행해서 하면 되는데
    Altair는 Mutation을 보내기 전에 type을 확인해준다.
*/

/*
    Avatar를 통해 저장되는 사진의 정보를 확인하면 promise로 불러와진다.
    그 안에 우리가 사용할 수 있는 정보가 불러와진다.
*/