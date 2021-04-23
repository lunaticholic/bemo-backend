import client from "../client";

// totalFollowing, totalFollowers은 parent를 가지고 있다. 괄호 안에 root라고 입력하고 console.log로 찍어보면 무엇이 나올까?
// 현재 알고싶은 user의 정보가 주르륵 나온다.
// parent인지 어떻게 확인하냐고? totalFollowing이 명시되어 있는 users.typeDefs.js를 확인해보자
// totalFollowing, totalFollowers이 누구의 품 안에 있는지
export default {
    User: {
        // 사용자가 어떤 사람을 팔로잉 하고 있다면, 사용자는 그 사람의 팔로워 리스트에 존재한다는 말이겠지?
        // 그러면 사용자를 팔로워리스트에 가지고 있는 사람의 숫자를 계산하면 totalFollowing이 되겠지?
        // 이거랑 아주 비슷한 기능을 하는 녀석이 seeFollowers.resolvers.js에 19번째줄이다
        totalFollowing: ({ id }) => client.user.count({ where: { followers: { some: { id } } } }),

        // 그러면 반대로 사용자를 팔로우하는 사람의 숫자는 어떻게 계산하느냐?
        // 어떤 사람의 팔로잉 리스트에 사용자의 아이디를 가지고 있는 경우만 계산한다면 totalFollowers가 되겠지?
        totalFollowers: ({ id }) => client.user.count({ where: { following: { some: { id } } } }),

        // 여기서는 누가 request로 seeProfile을 요청하는지를 알고 있어야 작동할수 있다.
        // 만약 현재 로그인한 user의 id와 현재 조회하려는 user의 id가 같다면 본인의 profile을 볼 수 있겠지?
        isMe: ({ id }, _, { loggedInUser }) => { if (!loggedInUser) { return false } return id === loggedInUser.id; },

        // 현재 내가 보고있는 user를 follow중인지 확인하려면 어떻게 해야될까?
        // 바로 지금 보고 있는 user의 id값을 불러와 확인할 수 있다.
        isFollowing: async ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) { return false }
            // 참고로 여기서는 findUnique메소드를 사용했지만 count를 사용할 수도 있다.
            const exists = await client.user.findUnique({ where: { username: loggedInUser.username } }).following({where: { id } })
            // const exists = await client.user.count({ where: { username: loggedInUser.username, following: { some: { id } } } })
            // 만약 count를 사용할 경우 return 값은 뭘로 바꿔야 될까? 32번째 줄에 적는다.
            // exists가 0이라면 false를 반환할것이고, 그러면 팔로잉하고 있지 않다는 의미이다.
            return exists.length !== 0;
            // return Boolean(exists);
        } 
    }
}