//Post.create({title:"The Cam", author:"Yanxi", content:"The Photograpy" , picture: "https://images.unsplash.com/photo-1480365501497-199581be0e66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"})
let selectedId;
let posters;
let postsDiv = document.getElementById("posters");

window.addEventListener("load", () => {
    renderDOM()

    // manange like and commnets
    manageLikeAndComment(postsDiv)
    manageCommnetsForm(document.getElementById('addCommentForm'))
})

function renderDOM() {
    renderPosts(Post.all().reverse(), postsDiv)
    renderUser()
}

function renderUser() {
    let user = Logged.getUser()

    let div = '<div class="card bg-light shadow p-3 mb-5 bg-white rounded">' +
        `<div class="mb-0">${user.username}<br><small class="mt-0">${user.about || ""}</small></div><br>` +
        `<img src="${user.profilePicture || "resources/default.webp"}" class="pictureUser">` +
        '<p class="mt-3 text-secondary">Flowers : 20 <br> Likes : 200</p>' +
        '</div>'

    let profile = document.getElementById("userProfile")
    profile.setAttribute("src", user.profilePicture || "resources/default.webp")

    let userDiv = document.getElementById("user")
    userDiv.innerHTML = div
}


function addPost() {
    location.href = "addPost.html"
}