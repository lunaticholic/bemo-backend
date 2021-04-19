// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import { PrismaClient } from "@prisma/client";

// PrismaClient 위에 마우스를 가져다 댄 후 설명문을 보면 좀 개쩌는 부분이 하나 있는데,
// 그것은 우리가 migrate했던 스키마의 형태로 예제를 보여준다는 것임
const client = new PrismaClient();

export default client;