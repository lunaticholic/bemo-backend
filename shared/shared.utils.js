// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨
import AWS from "aws-sdk";

// AWS에 파일을 업로드하기 위한 사전 설정
export const uploadToS3 = async ( file, userId, folderName ) => {

    // AWS에 접속하기 위한 계정을 설정하는 방법
    AWS.config.update({
        credentials: {
            accessKeyId: process.env.AWS_KEY,
            secretAccessKey: process.env.AWS_SECRET
        }
    })

    const { filename, createReadStream } = await file;
    const readStream = createReadStream();
    const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
    const { Location } = await new AWS.S3().upload({
        Bucket: "bemo-backend",
        Key: objectName,
        ACL: "public-read",
        Body: readStream
    }).promise();
    return Location;
}
/*
    Body: 파일을 의미함 (정확히는 stream)
    Bucket: 사용자가 S3 서버에 만든 Bucket의 이름을 명시
    Key: 업로드하는 파일의 이름을 지정
    ACL: Object의 privacy, public-read는 아무나 read 할 수 있다는 말임
*/