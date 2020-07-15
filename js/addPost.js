window.addEventListener("load", function(){
    let add = document.getElementById("add")
    add.addEventListener("click", addingNewPost)
})

function addingNewPost(){
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let content = document.getElementById("content").value
    let picture = document.getElementById("picture").value

    Post.create({title , author, content, picture})

    location.href = "index.html"
}

//Post.create({title:"The Cam", author:"Yanxi", content:"The Photograpy" , picture: "https://images.unsplash.com/photo-1480365501497-199581be0e66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"})