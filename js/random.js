let selectedId;
let posters
let postsDiv = document.getElementById("posters")
let sorted;

window.addEventListener("load", () => {
    renderDOM()

    // mange lies and commnets
    manageLikeAndComment(document.getElementById('posters'))
    // manage commmentsform
    manageCommnetsForm(document.getElementById('addCommentForm'))

    let sort = document.getElementById("sort")
    sort.addEventListener("change", () => {
        sorted = event.target.value
        renderDOM()
    })
})

function renderDOM() {
    let Posts = Post.all()
    if (sorted) {
        Posts = Posts.sort((a, b) => {
            if (a[sorted].length > b[sorted].length) {
                return 1
            } else if (a[sorted].length < b[sorted].length) {
                return -1
            } else {
                return 0
            }
        })
    }
    renderPosts(Posts.reverse(), postsDiv)
    renderProfilePicture()
}
