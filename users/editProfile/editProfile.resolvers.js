/*
    이 곳의 구문을 실행하려면 Altair를 실행해서 하면 되는데
    Altair는 Mutation을 보내기 전에 type을 확인해준다.
    Avatar를 통해 저장되는 사진의 정보를 확인하면 promise로 불러와진다.
    그 안에 우리가 사용할 수 있는 정보가 불러와진다.
*/

// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client"
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { createWriteStream } from "fs";
import { uploadPhoto } from "../../shared/shared.utils";

// Profile을 수정할 때 어떤 데이터들을 보내야 될까? 그 점을 고려하는게 1번째 목적이고
// 두번째는 password는 반드시 hashing된 password가 저장되어야 한다는 것을 기억해야 한다.
const resolverFn = async (_, { username, email, password: newPassword , bio, avatar}, { loggedInUser }) => {
    // 생각해보면 avatar라는 녀석을 데이터베이스에 직접 저장하면 파일이 엄청 커질테니 디비에는 파일경로만 지정해준다.
    let avatarUrl = null;

    // avatar라는 변수에 사진이 업로드되면 if문 안에 있는 구문이 실행될 것이다.
    if (avatar) {
        // avatarUrl에는 shared.utils.js에서 불러오는 uploadPhoto의 정보를 담을 것이다.
        avatarUrl = await uploadPhoto(avatar, loggedInUser.id);
        

        // Avatar를 통해 불러오는 사진의 정보를 보면 filename, createReadStream이라는 정보가 내장되어 있다. 그 정보를 가지고 본인의 프로필 사진을 불러오면 된다.
        // const { filename, createReadStream } = await avatar;
        // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;

        // 그래서 모든 파일을 readStream을 통해서 받아낼 것이다. 어떤 것을? 사진에 담겨 있는 정보 중 createReadStream이라는 내부의 정보를 불러올것이다.
        // 참고로 이 createReadStream만 다시 불러오면 엄청나게 많은 정보가 들어있음을 알 수 있다.
        // const readStream = createReadStream();

        // 현재 avatar를 저장할 때는 어떤 경로에 저장할 것인지 지정해주는 명령어이다. process.cwd()를 console.log에 출력해보면 현재 작업중인 폴더의 경로가 등장한다.
        // 또한 여러사람이 같은 이름으로 업로드하는 것을 방지하기 위해 unique한 파일로 업로드 될 수 있도록 지정해준다.
        // const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
        // readStream.pipe(writeStream);
        // avatarUrl = `http//localhost:4000/static/${newFilename}`;
    }
    
    let uglyPassword = null;
    // 그래서 그 점을 고려해서 bcrypt를 불러와서 다시 hashing한 다음 저장해야 한다.
    if (newPassword) { uglyPassword = await bcrypt.hash(newPassword, 10) }
    const updatedUser = await client.user.update({
        where: {
            id: loggedInUser.id,
        },
        data: { 
            username, email, bio,
            ...(uglyPassword && { password: uglyPassword }),
            // uglyPassword에 값이 있다면 password에는 uglyPassword값을 할당하여 저장할 것이다.
            ...(avatarUrl && {avatar:avatarUrl})
            // avatarUrl 값이 정해진다면 database의 avatar 칼럼에는 avatarUrl이 저장될 것이다.
        }
    });
    // 당연한거다. 13번째 줄이 정확하다면 ok에는 true가 담겨 Profile이 수정될 것이고 그렇지 않다면 ok에는 false가, error에는 메세지가 출력될 것이다.
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
        // protectedResolver를 호출하게 되면 어떤 현상이 발생하는냐? 여기에 user가 로그인 되어 있는지 안되어 있는지 선행을 시작하게 됨. 로그인 안되어 있으면? 못하는거지 뭐
        editProfile: protectedResolver(resolverFn),
    },
};