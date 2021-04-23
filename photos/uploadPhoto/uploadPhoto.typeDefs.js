import { gql } from "apollo-server";

export default gql`
    type Mutation {
        uploadPhoto(file: String!, caption: String): Photo
    }
`;
/* 
    사진을 업로드함에 있어서 가장 필요한 두가지가 무엇일까?
    바로 사진과 그에 대한 설명이다. 그래서 file과 caption이라는 두개의 인자를 전달받을 것이다.
    그러면 어떤 것을 반환받아야 될까? file과 caption은 어떤 모델에 들어있나?
    방금 생성된 사진이니 Photo를 반환받으면 되겠지
*/