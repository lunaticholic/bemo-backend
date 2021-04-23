// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        // 명심해야 될 부분이 바로 이 부분이다. 사진 업로드(file, caption)는 반드시 로그인이 되어 있는 상태여야만 가능한 작업이다.
        // 그렇기에 protectedResolver를 호출함으로써 로그인(loggedInUser)이 되어 있는지의 여부를 확인해야 한다.
        // 또한 명심해야 될 부분이 caption안에 hashtag가 존재하는지에 대한 여부를 판단하기 위해 parsing작업을 진행해줘야 한다.
        // parsing 작업이란 caption에 있는 문장 안의 hashtag 키워드들만 추출해내는 작업을 의미한다. (이곳에서)
        uploadPhoto: protectedResolver(async(_, { file, caption }, { loggedInUser }) => {
            // caption이 존재할경우
            if (caption) {
                // caption에 hashtag들이 들어 있다면 parsing작업을 진행해주세요
                // 참고로 hashtag를 parsing하려면 정규표현식을 써야 되는데 구글에 검색해보세요. 어려울거예요.
                const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
                // console.log(hashtags);
                // 그리고 hashtag를 생성하거나 이미 있다면 가져와서 사용할 수 있게 해주세요

            }
            // 위의 if문이 완료되면 사진을 저장하도록 도와주세요 (그것도 parsing작업이 완료된 hashtag와 함께해야되요)
            client.photo.create({ data: { file, caption, hashtags: { connectOrCreate: [ { where: { hashtag: "#food" }, create: { hashtag: "#food" } } ] } } })
            // 추가적으로 그 사진을 해당 hashtag에 추가하는 것도 잊지마세요
        })
    }
}