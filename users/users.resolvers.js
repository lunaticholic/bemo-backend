export default {
    User: {
        totalFollowing: (root) => {
            console.log(root.username);
            return 0;
        },
        totalFollowers: () => 777
    }
}
// totalFollowing은 parent를 가지고 있다. 괄호 안에 root라고 입력하고 console.log로 찍어보면 무엇이 나올까?
// parent인지 어떻게 확인하냐고? totalFollowing이 명시되어 있는 users.typeDefs.js를 확인해보자
// totalFollowing이 누구의 품 안에 있는지