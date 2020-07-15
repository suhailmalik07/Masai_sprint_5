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
    if (user.profile) {
        document.getElementById('userImg').src = user.profile
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