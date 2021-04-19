# Instaclone

Instalclone Backend...

---

## Installation Program

-[X] postgreSQL
_ https://postgresapp.com/downloads.html -[X] pgAdmin
_ https://www.pgadmin.org/download/pgadmin-4-macos/

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

## Intermediate execution instruction

-[X] npx prisma migrate dev
_ schema.prisma 안에서 정의한 구문을 데이터베이스의 형태로 변형시켜주는 명령어
_ 이 말은, SQL의 코드로 변환해준다는 이야기임

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
