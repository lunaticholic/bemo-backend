import { gql } from "apollo-server";

// isMine은 내가 comments를 작성했다면 comments를 삭제할 수 있는 버튼을 보여주기 위한 필드임
export default gql`
    type Comment {
        id: Int!
        user: User!
        photo: Photo!
        payload: String!
        isMine: Boolean!
        createdAt: String!
        updatedAt: String!
    }
`;