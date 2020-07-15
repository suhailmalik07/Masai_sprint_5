//Post.create({title:"The Cam", author:"Yanxi", content:"The Photograpy" , picture: "https://images.unsplash.com/photo-1480365501497-199581be0e66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"})
let posters
let post = document.getElementById("posters")

window.addEventListener("load", render)

function render() {

    posters = Post.all()

    renderPost(posters)

    post.addEventListener("click", function () {
        let target = event.target.id
        // console.log(target)
        if (target[1] == "l") {
            //console.log(target)
            addLikeToPost(target[0])
        }
        if (target[1] == "c") {
            let add = document.getElementById("addCom")
            add.addEventListener("click", function () {
                renderComment(target[0])
            })
        }
    })

    let add = document.getElementById("add")
    add.addEventListener("click", addPost)
}

function renderPost(res) {
    //console.log(res[0])
    post.innerHTML = ""

    for (i = res.length - 1; i >= 0; i--) {
        let div = document.createElement("div")

        let card = renderCard(res[i])

        div.innerHTML = card
        // console.log(card)
        post.append(div)
    }
}

function renderCard(data) {

    let profilePicture = User.all().find(user => user.username ==data.author)
    if (profilePicture){
        profilePicture = profilePicture.profilePicture
    } else {
        profilePicture = "https://images.unsplash.com/photo-1464820453369-31d2c0b651af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
    }


    let div = '<div class="card mb-3">' +
        `<div class="card-header"><img src="${profilePicture}" class = "rounded-circle picture"> ${data.author} </div>` +
        '<img src=' + data.picture + ' class="card-img-top" alt="...">' +
        '<div class="card-body">' +
        '<p class="card-text"><span class="font-weight-bolder">' + data.author + ' </span> ' + data.content + '</p>' +
        '<div class = "row">' +
        '<div class = "col-4 text-center">' +
        '<img src="https://image.flaticon.com/icons/svg/833/833472.svg" id=' + data.id + "like" + ' class="mr-1 imgWidth">' +
        '<p>' + data.likes.length + ' Likes</p>' +
        '</div>' +
        '<div class = "col-4 text-center">' +
        '<img src="https://image.flaticon.com/icons/svg/2636/2636351.svg" data-toggle="modal" data-target="#exampleModal" class="mr-1 imgWidth" id=' + data.id + "comment" + '>' +
        '<p>' + data.comments.length + ' Comments</p>' +
        '</div>' +
        '<div class = "col-4 text-center">' +
        '<img src="https://image.flaticon.com/icons/svg/1828/1828960.svg" class="mr-1 imgWidth">' +
        '<p> Share</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'

    return div
}

function renderComment(target) {
    console.log(target)
    let user = Logged.getUser()
    let com = document.getElementById("comment").value

    Post.addComment(target, user, com)
    render()
    document.getElementById("comment").value = ""
}

function addLikeToPost(target) {
    let user = Logged.getUser()

    //console.log(user)
    Post.addLike(target, user)

    render()

}

function addPost() {
    location.href = "addPost.html"
}