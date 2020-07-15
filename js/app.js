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
            console.log(username)
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
            name, email, username, password, profilePicture
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

    update({ name, username, password, email, newEmail, profilePicture }) {
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
            user.profilePicture = profilePicture || user.profilePicture
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
        const username = user.username
        // recieve post id and update likes list with username
        const posts = this.all()

        const post = this.get(postId)
        const indx = post.index
        delete post.index

        if (!post.likes.find(username => username == username)) {
            post.likes.push(username)
            posts[indx] = post
            this.updateDB(posts)
        }
    }

    getLike(postId, user) {
        // this will return true if user already liked this post
        const username = user.username
        const post = get(postId)

        if (post.likes.find(item => item == username)) {
            return true
        }
        return false
    }

    removeLike(postId, user) {
        const username = user.username
        // recieve post id and remove like with username
        const posts = this.all()

        const post = get(postId)
        const indx = post.index
        delete post.index

        post.likes = post.likes.filter(item => item.username != username)
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
        return JSON.parse(this.db.getItem(this.name))
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
    if (Logged.getUser().email) {
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



Post.addLike(0, { username: 'suhail' })
console.log(Post.get(0))