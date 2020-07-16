class DB {
    constructor(name) {
        this.name = name
        this.db = localStorage
    }

    init() {
        // initialize
        if (!this.db.getItem(this.name)) {
            this.updateDB([])
        }
    }

    updateDB(data) {
        // update the whole database
        this.db.setItem(this.name, JSON.stringify(data))
    }

    all() {
        return JSON.parse(this.db.getItem(this.name))
    }
}

class Users extends DB {

    constructor(name) {
        super(name)
    }

    isExists(email, username = '') {
        const users = this.all()
        // check if username or email is already exists
        if (username && users.find((user => user.username == username))) {
            // console.log(username)
            return true
        } else if (users.find((user => user.email == email))) {
            return true
        }
        return false
    }

    create({ name, email, username, password, profilePicture }) {
        const users = this.all()

        if (this.isExists(email, username)) {
            throw new Error('User already exists with this email or username!')
        }

        // email name, username, passowrd is mandatory
        if (!name || !email || !username || !password) {
            throw new Error('Name, Email, username and password is mandatory!')
        }

        // add user to database
        users.push({
            name, email, username, password, profilePicture, about: ''
        })

        this.updateDB(users)
        return true
    }

    get(email) {
        // this will return user object by email
        const users = this.all()

        let indx
        const user = users.find((user, i) => {
            if (user.email == email) {
                indx = i
                return true
            }
        })

        if (!user) {
            throw new Error("User doesn't exists with given email!")
        }
        user.index = indx
        return user
    }

    update({ name, username, password, email, newEmail, profilePicture, about }) {
        // this will update user profile whichever in it.. email is mandatory
        if (!email) {
            throw new Error('Email is mandatory! if you want to update email add it as newEmail')
        }

        // check if new email or username same as previous user
        if (this.isExists(newEmail, username)) {
            throw new Error('User already exists with this email or username!')
        }

        let users = this.all()

        // get user with email
        const user = this.get(email)
        const indx = user.index
        delete user.index

        try {
            user.name = name || user.name
            user.username = username || user.username
            user.password = password || user.password
            user.email = newEmail || user.email
            user.profilePicture = profilePicture
            user.about = about
        } catch (e) {
            throw new Error('Something wrong happened')
        }

        // update user object
        users[indx] = user

        // update to local storage
        this.updateDB(users)

        return true
    }
}

class Posts extends DB {
    constructor(name) {
        super(name)
    }

    create({ title, author, content, picture }) {
        const posts = this.all()

        if (!title || !author || !content) {
            throw new Error("Title, content and author(username) is required!")
        }

        let id = posts[posts.length - 1]
        if (id) {
            id = id.id + 1
        } else {
            id = 0
        }
        const post = {
            id: id,
            title,
            author,
            content,
            picture,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            likes: [],
            comments: []
        }

        posts.push(post)

        this.updateDB(posts)
        return id
    }

    get(postId) {
        const posts = this.all()
        let indx;
        const post = posts.find((post, i) => {
            if (post.id == postId) {
                indx = i
                return true
            }
        })

        if (!post) {
            throw new Error('Post does not exists with given id!')
        }

        post.index = indx
        return post
    }

    addLike(postId, user) {
        // recieve post id and update likes list with username
        const posts = this.all()

        const post = this.get(postId)
        const indx = post.index
        delete post.index

        if (!post.likes.find((username) => username == user.username)) {
            post.likes.push(user.username)
            posts[indx] = post
            this.updateDB(posts)
        }
    }

    getLike(postId, user) {
        // this will return true if user already liked this post
        const username = user.username
        const post = this.get(postId)

        if (post.likes.find(item => item == username)) {
            return true
        }
        return false
    }

    removeLike(postId, user) {
        // recieve post id and remove like with username
        const posts = this.all()

        const post = this.get(postId)
        const indx = post.index
        delete post.index

        post.likes = post.likes.filter(item => item != user.username)
        posts[indx] = post
        this.updateDB(posts)
    }

    addComment(postId, user, comment) {
        const username = user.username
        // recieve post id and update likes list with username
        const posts = this.all()

        let indx;
        const post = posts.find((post, i) => {
            if (post.id == postId) {
                indx = i
                return true
            }
        })

        if (!post) {
            throw new Error('Post does not exists with given id!')
        }

        post.comments.push({ username, comment })
        posts[indx] = post
        this.updateDB(posts)
    }
}

class LoggedDB {
    constructor(name) {
        this.name = name
        this.db = localStorage
    }

    init() {
        // initialize
        if (!this.db.getItem(this.name)) {
            this.updateDB({})
        }
    }

    updateDB(data) {
        // update the whole database
        this.db.setItem(this.name, JSON.stringify(data))
    }

    getUser() {
        const email = JSON.parse(this.db.getItem(this.name)).email
        if (!email) {
            return false
        }
        return User.get(email)
    }

    setUser({ email, password }) {
        const user = User.get(email)
        if (!user || user.password != password) {
            throw new Error("User doesn't exists with given email and password!")
        }
        this.updateDB(user)
        return true
    }

    removeUser() {
        this.updateDB({})
    }
}

function isUser() {
    if (Logged.getUser()) {
        return true
    } else {
        return false
    }
}

const User = new Users('users')
User.init()

const Post = new Posts('posts')
Post.init()

const Logged = new LoggedDB('logged')
Logged.init()



function createCard(data) {
    const card = document.createElement("div")
    let profilePicture = User.all().find(user => user.username == data.author).profilePicture

    if (!profilePicture) {
        profilePicture = "resources/default.webp"
    } else {
        profilePicture = profilePicture
    }

    const user = Logged.getUser()
    let likeURL;
    if (!Post.getLike(data.id, user)) {
        likeURL = 'https://image.flaticon.com/icons/svg/833/833300.svg'
    } else {
        likeURL = 'https://image.flaticon.com/icons/svg/833/833472.svg'
    }

    let div = '<div class="card mb-3">' +
        `<div class="card-header"><img src="${profilePicture}" class = "rounded-circle picture"> ${data.author} </div>`
    if (data.picture) {
        div += '<img src=' + data.picture + ' class="card-img-top" alt="...">'
    }
    div += '<div class="card-body">' +
        '<p class="card-text"><span class="font-weight-bolder">' + data.author + ' </span> ' + data.content + '</p>' +
        '<div class = "row">' +
        '<div class = "col-4 text-center">' +
        `<img src="${likeURL}" id=` + data.id + ",like" + ' class="mr-1 imgWidth">' +
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

function addLikeToPost(postId) {
    let user = Logged.getUser()
    if (!Post.getLike(postId, user)) {
        Post.addLike(postId, user)
    } else {
        Post.removeLike(postId, user)
    }
    renderDOM()
}

function manageLikeAndComment(postsDiv) {
    // add event listener for commnet and likes
    postsDiv.addEventListener("click", function () {
        let target = (event.target.id).split(',')
        console.log(target)

        if (target[1] == "like") {
            addLikeToPost(Number(target[0]))
        }
        if (target[1] == "comment") {
            // load comments
            const commnetsDiv = document.getElementById('comments')
            // console.log(commnetsDiv)
            selectedId = Number(target[0])
            renderComments(selectedId, commnetsDiv)
        }
    })
}

function renderProfilePicture() {
    let user = Logged.getUser()

    let profile = document.getElementById("userProfile")
    profile.setAttribute("src", user.profilePicture || "resources/default.webp")
}

function renderPosts(posts, postsDiv) {
    postsDiv.innerHTML = ""

    const frag = document.createDocumentFragment()

    for (i = posts.length - 1; i >= 0; i--) {
        const card = createCard(posts[i])
        frag.appendChild(card)
    }
    postsDiv.appendChild(frag)
}

function manageCommnetsForm(target) {
    // add event listener to add commnet form
    target.addEventListener('submit', () => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const comment = formData.get('comment')
        const user = Logged.getUser()

        Post.addComment(selectedId, user, comment)
        event.target.reset
        renderDOM()
        $('#commentModal').modal('toggle');
    })
}

function renderComments(postId, target) {
    target.innerHTML = ""
    const frag = document.createDocumentFragment()

    const comments = Post.get(postId).comments

    for (let i = comments.length - 1; i >= 0; i--) {
        const comment = createComment(comments[i])
        frag.appendChild(comment)
    }
    target.appendChild(frag)
    console.log(target)
}

function createComment(comment) {
    const li = document.createElement('li')
    li.className = 'list-group-item px-0'

    const inner = `<p class="mb-0"><span class="font-weight-bold mr-2">${comment.username}</span> ${comment.comment}</p class="my-0">`

    li.innerHTML = inner
    return li
}