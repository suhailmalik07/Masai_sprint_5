let posters
let selectedId
let post = document.getElementById("posters")

window.addEventListener("load", () => {

    renderDOM()

    document.getElementById('addCommentForm').addEventListener('submit', () => {
        event.preventDefault()
        addCommentToPost(selectedId)
        $('#commentModal').modal('toggle');
    })

    renderProfilePicture()

})

function renderDOM() {
    posters = Post.all()

    renderPost(posters)

    post.addEventListener("click", function () {
        let target = event.target.id.split(",")

        if (target[1] == "like") {
            addLikeToPost(target)
            return
        }
        else if (target[1] == "comment") {
            selectedId = Number(target[0])
            renderCommentsofCommentBox(selectedId)
            return
        }
        else{
            renderPostCard(Number(target))
        }

    })
}

function renderPost(res) {
    //console.log(res[0])
    post.innerHTML = ""

    for (i = 0; i < res.length; i++) {
        let div = document.createElement("div")

        let card = renderCard(res[i])

        div.innerHTML = card
        post.append(div)
    }
}

function addCommentToPost(postId) {
    const user = Logged.getUser()
    const comment = document.getElementById("comment").value

    Post.addComment(postId, user, comment)
    renderDOM()
    document.getElementById("comment").value = ""
}

function renderCommentsofCommentBox(res){
    let comments = posters[res].comments

   // console.log(comments)

    const target = document.getElementById('comment')
    target.innerHTML = ""

    let head = document.createElement("h3")
    head.textContent = "Comments"

    target.appendChild(head)
     
    const frag = document.createDocumentFragment()

    for (let i = comments.length - 1; i >= 0; i--) {
        //console.log(comments[i])
        const comment = createComment(comments[i])
        frag.appendChild(comment)
    }
    target.appendChild(frag)

}

function renderCard(data) {
    let profilePicture = User.all().find(user => user.username == data.author)
    if (profilePicture) {
        profilePicture = profilePicture.profilePicture
    } else {
        profilePicture = "https://images.unsplash.com/photo-1464820453369-31d2c0b651af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
    }

    let user = Logged.getUser()

    //console.log(data.comments)

    let div = '<div class="card col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8 mt-3 border-0">' +
        `<div class="card-header"><img src="${profilePicture || "https://images.unsplash.com/photo-1464820453369-31d2c0b651af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"}" class = "rounded-circle picture"> ${data.author}`
        if(user.username != data.author){
            div +=`<span class="badge badge-primary mr-2 mt-2 float-right">Follow</span>`
        }
       div += `</div> `+
        '<img src=' + data.picture + ' data-toggle="modal" data-target="#exampleModalLong" id='+ data.id+' class="card-img-top" alt="...">' +
        '<div class="card-body border">' +
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

    return div
}

function addLikeToPost(target) {
    let postId = Number(target[0])

    let user = Logged.getUser()
    Post.addLike(postId, user)

    renderDOM()
}

function renderPostCard(target) {
    //console.log(posters[target])

    let title = document.getElementById("title").textContent
    
    title.textContent = posters[target].author

    let div = '<img src=' + posters[target].picture + ' class="card-img-top" alt="...">' +
        '<div class="card-body">' +
        '<p class="card-text"><span class="font-weight-bolder"> ' + posters[target].author + '</span> ' + posters[target].content + '</p>' +
        '<div class = "row">' +
        '<div class = "col-4 text-center">' +
        '<img src="https://image.flaticon.com/icons/svg/833/833472.svg" id=' + posters[target].id + ",like" + ' class="mr-1 imgWidth">' +
        '<p>' + posters[target].likes.length + ' Likes</p>' +
        '</div>' +
        '<div class = "col-4 text-center">' +
        '<img src="https://image.flaticon.com/icons/svg/2636/2636351.svg"  data-toggle="modal" data-target="#exampleModalLong" class="mr-1 imgWidth" id=' + posters[target].id + ",comment" + '>' +
        '<p>' + posters[target].comments.length + ' Comments</p>' +
        '</div>' +
        '<div class = "col-4 text-center">' +
        '<img src="https://image.flaticon.com/icons/svg/1828/1828960.svg" class="mr-1 imgWidth">' +
        '<p> Share</p>' +
        '</div>' +
        '</div>' +
        '<p class="mt-3"> The Post is added : ' + posters[target].updatedAt + '</p> <hr>'

    let postCard = document.getElementById("cardPost")

    renderComments(posters[target].comments)

    postCard.innerHTML = div
}

function renderComments(comments){
    //console.log(comments)

    const target = document.getElementById('comments')
    target.innerHTML = ""

    let head = document.createElement("h3")
    head.textContent = "Comments"

    target.appendChild(head)
     
    const frag = document.createDocumentFragment()

    for (let i = comments.length - 1; i >= 0; i--) {
        const comment = createComment(comments[i])
        frag.appendChild(comment)
    }
    target.appendChild(frag)

}

function createComment(comment) {
    //console.log(comment)
    const li = document.createElement('li')
    li.className = 'list-group-item px-0'

    const inner = `<p class="mb-0"><span class="font-weight-bold mr-2">${comment.username}</span> ${comment.comment}</p class="my-0">`

    li.innerHTML = inner
    return li

}

function renderProfilePicture() {
    let user = Logged.getUser()

    let profile = document.getElementById("userProfile")
    profile.setAttribute("src", user.profilePicture || "resources/default.webp")
}

/**'<div class="card col-sm-6 col-md-8 m-3 border-0 ">' +
        '<div class="card-header"><img src="https://via.placeholder.com/25X25" class = "rounded-circle"> ' + data.author + '</div>' +
        '<img src=' + data.picture + ' class="card-img-top" alt="...">' +
        '<div class="card-body border">' +
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
        '</div>' */


/**'<div class="card col-sm-6 col-md-8 m-3 border-0 ">'+
'<div class="card-header"><img src="https://via.placeholder.com/20X20"> ' + data.author + '</div>'+
'<img src=' + data.picture + ' class="card-img-top" alt="...">'+
'<div class="card-body">'+
'<p class="card-text"><span class="font-weight-bolder">'+ data.author + ' </span> '+ data.content +'</p>'+
'<img src="https://image.flaticon.com/icons/svg/833/833472.svg" id='+data.id + "like" + ' class="mr-1 imgWidth">'+
'<img src="https://image.flaticon.com/icons/svg/2636/2636351.svg" class="mr-1 imgWidth" id='+data.id + "comment" +' data-toggle="modal" data-target="#exampleModalLong">'+
'<img src="https://image.flaticon.com/icons/svg/1828/1828960.svg" class="mr-1 imgWidth">'+
'</div>'+
'</div>' */