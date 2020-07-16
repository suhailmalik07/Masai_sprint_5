window.addEventListener("load", function () {
    if (!isUser()) {
        location.href = 'login.html'
        return
    }

    let add = document.getElementById("add")
    add.addEventListener("click", addingNewPost)

    renderProfilePicture()
})

function addingNewPost() {
    let title = document.getElementById("title").value
    let author = Logged.getUser().username
    let content = document.getElementById("content").value
    let picture = document.getElementById("picture").value

    Post.create({ title, author, content, picture })

    location.href = "index.html"
}

function renderProfilePicture(){
    let user = Logged.getUser()

    let profile = document.getElementById("userProfile")
    profile.setAttribute("src" , user.profilePicture || "resources/default.webp")
}

//Post.create({title:"The Cam", author:"Yanxi", content:"The Photograpy" , picture: "https://images.unsplash.com/photo-1480365501497-199581be0e66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"})