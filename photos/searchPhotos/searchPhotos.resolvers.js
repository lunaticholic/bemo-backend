// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../../client";

export default {
    Query: {
        // 유저들이 올려놓은 사진을 찾는 방법
        // 고것은 바로 keyword 검색을 통해서 찾는다 유후
        searchPhotos: (_, { keyword }) => client.photo.findMany({ where: { caption: { startsWith: keyword } } })
    }
}