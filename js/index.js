//Post.create({title:"The Cam", author:"Yanxi", content:"The Photograpy" , picture: "https://images.unsplash.com/photo-1480365501497-199581be0e66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"})
let selectedId;
let posters;
let sorted;
let postsDiv = document.getElementById("posters");

window.addEventListener("load", () => {
    if (user)
        renderDOM()

    // manange like and commnets
    manageLikeAndComment(postsDiv)
    manageCommnetsForm(document.getElementById('addCommentForm'))

    // handle sort button
    let sort = document.getElementById("sort")
    sort.addEventListener("change", () => {
        sorted = event.target.value
        renderDOM()
    })
})

function renderDOM() {
    const currUser = Logged.getUser()
    const userFollowings = currUser.followings
    let Posts = Post.all().filter(post => {
        if (userFollowings.includes(post.author) || post.author == currUser.username) {
            return true
        }
    })
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
    if (Posts.length == 0) {
        const target = document.getElementById('posters')
        const p = document.createElement('h4')
        p.innerText = "You didn't followed someone?"
        p.className = 'text-muted text-center'
        target.appendChild(p)
        renderUser()
        return
    }
    renderPosts(Posts.reverse(), postsDiv)
    renderUser()
}

function renderUser() {
    let user = Logged.getUser()
    let res = Post.all()

    let postCount = 0

    for (i = res.length - 1; i >= 0; i--) {
        if (user.username == res[i].author) {
            postCount++
        }
    }

    let div = '<div class="card bg-light shadow p-3 mb-5 bg-white rounded">' +
        `<div class="mb-0">${user.username}<br><small class="mt-0">${user.about || ""}</small></div><br>` +
        `<img src="${user.profilePicture || "resources/default.webp"}" class="pictureUser">` +
        `<p class="mt-3 text-secondary"> Followers :<span class="text-success font-weight-bold"> ${user.followers.length}</span><br> Followings :<span class="text-success font-weight-bold"> ${user.followings.length}</span> <br> Posts :<span class="text-success font-weight-bold"> ${postCount}</span></p>` +
        '</div>'

    let profile = document.getElementById("userProfile")
    profile.setAttribute("src", user.profilePicture || "resources/default.webp")

    let userDiv = document.getElementById("user")
    userDiv.innerHTML = div
}


function addPost() {
    location.href = "addPost.html"
}