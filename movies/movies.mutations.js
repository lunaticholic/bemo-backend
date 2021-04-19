// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import client from "../client"

export default {
    // _는 root를 적는것과 똑같다
    // args에는 resolvers의 query에서 오는 값을 반환한다.
    Mutation: {
        createMovie: (_, { title, year, genre }) => 
            client.movie.create({
                data: {
                    title,
                    year,
                    genre
                },
            }),
        deleteMovie: (_, { id }) => client.movie.delete({ where: { id } }),
        updateMovie: (_, { id, year }) => client.movie.update({ where: { id }, data: { year }})
    },
}