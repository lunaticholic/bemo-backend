# Instaclone

Instalclone Backend...

---

## Installation Program

-[X] postgreSQL
\_ https://postgresapp.com/downloads.html

-[X] pgAdmin
\_ https://www.pgadmin.org/download/pgadmin-4-macos/

-[X] Altair
_ playground로는 파일 업로드 테스트 못함
_ https://altair.sirmuel.design/
\_ 테스트할 때에는 로그인하여 발급한 토큰을 헤더에 설정하면 끗

## Installation NPM Module

-[X] npm install apollo-server graphql
\_ https://www.apollographql.com/docs/apollo-server/getting-started/

-[X] npm install nodemon --save-dev
_ nodemon은 파일들을 지켜보면서 뭔가가 수정될 때마다 명령어를 하나 실행하는 아주 도움 뿜뿜 녀석
_ 그 말은 곧 파일을 저장할 때마다 수정된 사항 확인되면 바로 서버가 재시작됨 \* --save-dev는 dev dependencies에 추가해줌

-[X] npm install --save-dev @babel/core
_ https://babeljs.io/setup#installation
_ 자바스크립트 컴파일
_ 최신 자바스크립트 코드를 작성하였을 때, 브라우저가 이해할 수 있는 코드로 변환해줌
_ node.js에서 이해 가능한 평범한 코드로 바꿔줌
_ node 버전이 낮든 높든 신경쓰지 않아요
_ --save-dev는 dev dependencies에 추가해줌 -[X] npm install @babel/node --save-dev
_ 기본적을 콘솔에서 JS파일을 실행해줌
_ --save-dev는 dev dependencies에 추가해줌 -[X] npm install @babel/preset-env --save-dev
_ 위의 모듈과 함께 설치를 진행해야 됨
_ 우리의 코드가 괜찮은지 아닌지, 아니면 변환되어야 하는지 판단해주는 모듈 \* --save-dev는 dev dependencies에 추가해줌

-[X] npm install @prisam/cli -D
_ https://www.prisma.io/
_ Prisma는 ORM임 (Object Relational Mapper)
_ SQL 코드를 쓸 필요 없이 자바스크립트 코드를 작성하면 Prisma가 데이터베이스와 대신 Communication을 진행함
_ 이걸 설치하면 반드시 다음의 구문도 같이 해야 됨
_ npx prisma init
_ 명령어가 달라질수도 있으니 홈페이지를 먼저 방문해서 확인바람

-[X] npx prisma studio
\_ 우리를 위한 시각적 데이터를 제공해주는 고마운 녀석
\_ 데이터베이스에 저장된 테이블이며 칼럼들, 그리고 안에 들어 있는 데이터를 보여주는 Amazing
\_ 자주 쓸 예정이니까 이 역시 package.json의 script 부분에 저장하면 쉽겠지?
\_ 참고로 실행하면 안에서 데이터를 수정할 수도 있음(?)(!)

-[X] npm install graphql-tools@latest
\_ 기본적으로 모든 걸 함께 불러오도록 해주는 Super Sexy한 모듈
\_ 뒤에 @latest는 가장 최근 버전을 설치하겠다는 압박임

-[X] npm install dotenv
\_ env파일을 읽어야 되니까 필수항목으로 설치해야됨

-[X] npm install bcrypt
\_ 비밀번호를 hashing해서 저장하기 위한 아주 좋은 모듈

-[X] npm install apollo-server-express
\_ apollo-server로 할 수 있는 환경은 매우 제한적인 관계로 middleware인 express를 겸용해야 한다.

-[X] npm install morgan
\_ 로깅(logging)에 도움을 주는 미들웨어, 로깅이란 무슨일이 어디에서 일어났는지를 기록하는 것을 의미한다.
_ https://www.npmjs.com/package/morgan
_ tiny: 간략하게 로그를 기록하는 것
\_ combined: 상세하게 로그를 기록하는 것

## Intermediate execution instruction

-[X] npx prisma migrate dev
\_ schema.prisma 안에서 정의한 구문을 데이터베이스의 형태로 변형시켜주는 명령어
\_ 이 말은, SQL의 코드로 변환해준다는 이야기임
\_이 것은 곧 데이터베이스에도 적용시킨다는 아주 Super Cool한 명령어
\_ 많이 쓸 예정이라면 package.json의 script 부분에 등록하면 됨

-[X] npm install jsonwebtoken
\_ token은 두가지가 필요하다.
\_ payload 우리가 토근에 넣게 되는 것이고, secretOrPrivateKey 서버가 서명하는 키

## Installation VSCODE Extentions

-[X] Prisma
_ schema.prisma 파일을 작성할 때 텍스트에 색상을 입혀준다
_ 또한, 자동완성 기능을 가지고 있다.
_ 혹시나, schema를 작성한 후에 저장했을때 자동정렬이 안되면 다음의 방법을 사용해라.
_ default formatter를 null로 설정하고 \* settings.json을 실행해서 다음의 문구를 작성하세요.
{
"editor.formatOnSave": true,
"[prisma]": {
"editor.defaultFormatter": "Prisma.prisma"
},
"[typescript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescriptreact]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascript]": {
"editor.defaultFormatter": "esbenp.prettier-vscode"
}
}
