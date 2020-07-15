window.onload = function () {
    document.getElementById('registerForm').addEventListener('submit', handleRegister)
}

function handleRegister() {
    event.preventDefault()
    const formData = new FormData(event.target)

    const payload = {
        name: formData.get('name'),
        username: formData.get('username'),
        email: formData.get('email'),
        gender: formData.get('gender'),
        password: formData.get('password')
    }
    try {
        User.create(payload)
        alert('You are registered successfully!')
        location.href = 'login.html'
    } catch (error) {
        alert(error)
    }
}