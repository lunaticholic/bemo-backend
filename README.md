# Instaclone

Instalclone Backend...

-----

## Installation NPM Module
-[X] npm install apollo-server graphql
    * https://www.apollographql.com/docs/apollo-server/getting-started/

-[X] npm install nodemon --save-dev
    * nodemon은 파일들을 지켜보면서 뭔가가 수정될 때마다 명령어를 하나 실행하는 아주 도움 뿜뿜 녀석
    * 그 말은 곧 파일을 저장할 때마다 수정된 사항 확인되면 바로 서버가 재시작됨
    * --save-dev는 dev dependencies에 추가해줌

-[X] npm install --save-dev @babel/core
    * https://babeljs.io/setup#installation
    * 자바스크립트 컴파일
    * 최신 자바스크립트 코드를 작성하였을 때, 브라우저가 이해할 수 있는 코드로 변환해줌
    * node.js에서 이해 가능한 평범한 코드로 바꿔줌
    * node 버전이 낮든 높든 신경쓰지 않아요
    * --save-dev는 dev dependencies에 추가해줌
-[X] npm install @babel/node --save-dev
    * 기본적을 콘솔에서 JS파일을 실행해줌
     * --save-dev는 dev dependencies에 추가해줌
-[X] npm install @babel/preset-env --save-dev
    * 위의 모듈과 함께 설치를 진행해야 됨
    * 우리의 코드가 괜찮은지 아닌지, 아니면 변환되어야 하는지 판단해주는 모듈
    * --save-dev는 dev dependencies에 추가해줌