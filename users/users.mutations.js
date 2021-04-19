import client from "../client";

// 메소드가 뭔지 궁금하면 메소드에 마우스를 갖다대봐!
export default {
    Mutation: {
        createAccount: async (_, { username, email, password }) => {
            // 데이터베이스에 같은 username이나 같은 email이 있는지 반드시 선제검사를 통해 걸러내야된다야
            const existingUser = await client.user.findFirst({ where: { OR: [ { username }, { email } ] } });
            console.log(existingUser);
            // 만약 없다면, 정보를 저장하는데 password는 hash 형태로 저장할거야

            // 그러고 모두 다 잘된다면 user를 return 할거야
        },
    },
};