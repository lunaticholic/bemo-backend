export default {
    Comment: {
        // 현재 이 댓글이 내꺼인지 아닌지도 확인해야겠지?
        // 참고로 댓글은 user가 업로드 하는거니까 userId가 담겨 있지롱
        isMine: ({ userId }, _, { loggedInUser }) => {
            if(!loggedInUser) { return false }
            return userId === loggedInUser.id
        }
    }
}