// 이 파일은 photos 폴더내에서 재사용을 하고 있는 코드를 모아놓은 장소이다

// import문을 사용하려면 package.json에 babel 관련 모듈이 설치되어 있는지 확인해보고, 없으면 README.md에 있는 babel모듈 전부를 설치해라
// import문은 babel/preset-env가 있어야됨

export const processHashtags = (caption) => {
    // caption에 hashtag들이 들어 있다면 parsing작업을 진행해주세요
    // 참고로 hashtag를 parsing하려면 정규표현식을 써야 되는데 구글에 검색해보세요. 어려울거예요.
    // 참고로 hashtag가 없는 caption이 있을수도 있어요! 주의하세요!
    const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
    // console.log(hashtags);

    // 그리고 hashtag를 생성하거나 이미 있다면 가져와서 사용할 수 있게 해주세요
    return hashtags.map(hashtag => ({ where: { hashtag }, create: { hashtag } }))
}