//Post.create({title:"The Cam", author:"Yanxi", content:"The Photograpy" , picture: "https://images.unsplash.com/photo-1480365501497-199581be0e66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"})
let selectedId;
let posters;
let postsDiv = document.getElementById("posters");

window.addEventListener("load", () => {
    renderDOM()

    // add event listener to add commnet form
    document.getElementById('addCommentForm').addEventListener('submit', () => {
        event.preventDefault()
        addCommentToPost(selectedId)
        $('#commentModal').modal('toggle');
    })

})

function renderDOM() {
    renderPosts(Post.all())

    postsDiv.addEventListener("click", function () {
        let target = (event.target.id).split(',')

        if (target[1] == "like") {
            addLikeToPost(Number(target[0]))
        }
        if (target[1] == "comment") {
            selectedId = Number(target[0])
            renderComments(selectedId)
        }
    })

    renderUser()

    let add = document.getElementById("add")
    add.addEventListener("click", addPost)
}

function renderUser() {

    let user = Logged.getUser()

    let div = '<div class="card bg-light shadow p-3 mb-5 bg-white rounded">' +
        `<div class="mb-0">${user.username}<br><small class="mt-0">${user.about || ""}</small></div><br>` +
        `<img src="${user.profilePicture || "resources/default.webp"}" class="pictureUser">` +
        '<p class="mt-3 text-secondary">Flowers : 20 <br> Likes : 200</p>' +
        '</div>'

    let profile = document.getElementById("userProfile")
    profile.setAttribute("src" , user.profilePicture || "resources/default.webp")

    let userDiv = document.getElementById("user")
    userDiv.innerHTML = div


}

function renderPosts(posts) {
    //console.log(posts)
    postsDiv.innerHTML = ""

    const frag = document.createDocumentFragment()

    for (i = posts.length - 1; i >= 0; i--) {
        const card = createCard(posts[i])
        frag.appendChild(card)
    }
    postsDiv.appendChild(frag)
}

function createCard(data) {
    const card = document.createElement("div")
    let profilePicture = User.all().find(user => user.username == data.author)
    if (profilePicture) {
        profilePicture = profilePicture.profilePicture
    } else {
        profilePicture = "https://images.unsplash.com/photo-1464820453369-31d2c0b651af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
    }

    let div = '<div class="card mb-3">' +
        `<div class="card-header"><img src="${profilePicture || "https://images.unsplash.com/photo-1464820453369-31d2c0b651af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"}" class = "rounded-circle picture"> ${data.author} </div>` +
        '<img src=' + data.picture + ' class="card-img-top" alt="...">' +
        '<div class="card-body">' +
        '<p class="card-text"><span class="font-weight-bolder">' + data.author + ' </span> ' + data.content + '</p>' +
        '<div class = "row">' +
        '<div class = "col-4 text-center">' +
        '<img src="https://image.flaticon.com/icons/svg/833/833472.svg" id=' + data.id + ",like" + ' class="mr-1 imgWidth">' +
        '<p>' + data.likes.length + ' Likes</p>' +
        '</div>' +
        '<div class = "col-4 text-center">' +
        '<img src="https://image.flaticon.com/icons/svg/2636/2636351.svg" data-toggle="modal" data-target="#commentModal" class="mr-1 imgWidth" id=' + data.id + ",comment" + '>' +
        '<p>' + data.comments.length + ' Comments</p>' +
        '</div>' +
        '<div class = "col-4 text-center">' +
        '<img src="https://image.flaticon.com/icons/svg/1828/1828960.svg" class="mr-1 imgWidth">' +
        '<p> Share</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'

    card.innerHTML = div
    return card
}

function addCommentToPost(postId) {
    const user = Logged.getUser()
    const comment = document.getElementById("comment").value

    Post.addComment(postId, user, comment)
    renderDOM()
    document.getElementById("comment").value = ""
}

function addLikeToPost(postId) {
    let user = Logged.getUser()
    Post.addLike(postId, user)
    renderDOM()
}

function addPost() {
    location.href = "addPost.html"
}

function renderComments(postId) {
    const target = document.getElementById('comments')
    target.innerHTML = ""

    const frag = document.createDocumentFragment()

    const comments = Post.get(postId).comments

    for (let i = comments.length - 1; i >= 0; i--) {
        const comment = createComment(comments[i])
        frag.appendChild(comment)
    }
    target.appendChild(frag)
}

function createComment(comment) {
    const li = document.createElement('li')
    li.className = 'list-group-item px-0'

    const inner = `<p class="mb-0"><span class="font-weight-bold mr-2">${comment.username}</span> ${comment.comment}</p class="my-0">`

    li.innerHTML = inner
    return li

}