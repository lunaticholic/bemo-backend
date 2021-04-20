import client from "../client";

export default {
    Query: {
        seeProfile: (_, {username}) => client.user.findUnique({
            where: {
                username
            }
        })
    },
}

/*
    5번째 줄
    findUnique란 메소드는 이미 prisma를 통해 정의한 unique값이 설정된 칼럼만 찾을 수 있는 메소드이다.
*/