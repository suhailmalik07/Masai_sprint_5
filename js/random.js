let selectedId;
let posters
let postsDiv = document.getElementById("posters")

window.addEventListener("load", () => {
    renderDOM()

    // mange lies and commnets
    manageLikeAndComment(document.getElementById('posters'))
    // manage commmentsform
    manageCommnetsForm(document.getElementById('addCommentForm'))
})

function renderDOM() {
    renderProfilePicture()
    renderPosts(Post.all().reverse(), postsDiv)
}

