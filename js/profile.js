window.onload = function () {
    //check if user is logged in or not
    if (!isUser()) {
        location.href = 'login.html'
        return
    }

    // check if there are username in url
    const urlParams = new URLSearchParams(location.search)
    const username = urlParams.get('username')
    let user
    if (username) {
        user = User.all().find(item => item.username == username)
        if (!user) {
            alert('there are no user with this username ' + username)
            location.href = 'index.html'
            return
        }
        loadProfile(user)
    } else {
        user = Logged.getUser()
        loadProfile(user)
    }

    handleUpdateForm(user)

    // add event listener to edit form
    document.getElementById('editForm').addEventListener('submit', () => {
        event.preventDefault()
        updateUser(user)
    })

    // add event listener to password form
    document.getElementById('editPasswordForm').addEventListener('submit', () => {
        event.preventDefault()
        updatePassword(user)
    })

    renderPost()

}

function renderPost() {
    let res = Post.all()
    let post = document.getElementById("posters")
    post.innerHTML = ""

    let userName = Logged.getUser()

    console.log(userName.username)

    for (i = res.length - 1; i >= 0; i--) {
        if (userName.username == res[i].author) {
            let div = document.createElement("div")
            div.setAttribute("class", "row")

            let card = renderCard(res[i])

            div.innerHTML = card
            post.append(div)
        }
    }
}

function renderCard(data) {
    let profilePicture = User.all().find(user => user.username == data.author)
    if (profilePicture) {
        profilePicture = profilePicture.profilePicture
    } else {
        profilePicture = "https://images.unsplash.com/photo-1464820453369-31d2c0b651af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
    }


    console.log(data.comments)

    let div = '<div class="card col-sm-12 col-md-11 m-3 ml-4 border-0 ">' +
        `<div class="card-header"><img src="${profilePicture || "https://images.unsplash.com/photo-1464820453369-31d2c0b651af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"}" class = "rounded-circle picture"> ${data.author} </div>` +
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
        '</div>'

    return div
}

function updateUser(user) {
    user = Logged.getUser()
    const formData = new FormData(event.target)
    const name = formData.get('name')
    const username = formData.get('username')
    const profilePicture = formData.get('profilePicture')
    const about = formData.get('about')

    const payload = {
        name,
        email: user.email,
        profilePicture,
        about
    }

    // console.log(payload)

    // if username is different
    if (user.username != username) {
        payload.username = username
    }

    try {
        User.update(payload)
        // close the modal
        $('#editProfile').modal('toggle');

        const newUser = User.get(user.email)
        loadProfile(newUser)
    } catch (error) {
        alert(error)
    }
}

function handleUpdateForm(user) {
    document.getElementById('updateName').value = user.name
    document.getElementById('username').value = user.username
    document.getElementById('profilePicture').value = user.profilePicture || ""
    document.getElementById('aboutMe').value = user.about || ""
}



function loadProfile(user) {
    user = Logged.getUser()
    if (user.profilePicture) {
        document.getElementById('userImg').src = user.profilePicture
    }

    document.getElementById('name').innerText = user.name
    document.getElementById('followers').innerText = user.followers || 0
    document.getElementById('following').innerText = user.following || 0
    document.getElementById('posts').innerText = user.posts || 0
    document.getElementById('about').innerText = user.about || 'Nothing here'
}

function updatePassword(user) {
    event.preventDefault()

    user = Logged.getUser()

    const formData = new FormData(event.target)
    const oldPassword = formData.get('oldPassword')
    const newPassword = formData.get('newPassword')

    if (user.password != oldPassword) {
        alert('your old password is incorrect!')
        return
    }

    const payload = {
        email: user.email,
        password: newPassword
    }
    try {
        User.update(payload)
        // close the modal
        $('#editPassword').modal('toggle');
    } catch (error) {
        alert(error)
    }
}