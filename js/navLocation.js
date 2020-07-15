window.addEventListener("load",function(){
    let index = document.getElementById("index")
    index.addEventListener("click", locateHome)

    let home = document.getElementById("home")
    home.addEventListener("click", locateHome)

    let random = document.getElementById("random")
    random.addEventListener("click", locateRandom)

    let profile = document.getElementById("profile")
    profile.addEventListener("click", locateProfile)
})

function locateHome(){
    location.href = "./index.html"
}

function locateRandom(){
    location.href = "./random.html"
}

function locateProfile(){
    location.href = "./profile.html"
}
 
