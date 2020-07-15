window.onload = function () {
    document.getElementById('loginForm').addEventListener('submit', handleLogin)
}

function handleLogin() {
    event.preventDefault()

    const formData = new FormData(event.target)

    const payload = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    try {
        Logged.setUser(payload)
        location.href = 'index.html'
    } catch (error) {
        alert(error)
    }
}