let posters 
let post = document.getElementById("posters")

window.addEventListener("load", function(){
    posters = Post.all()

    renderPost(posters)

    post.addEventListener("click", function(){
        let target = event.target.id
        
        if(target[1] == "l"){
            addLikeToPost(target)
            return
        }
        else if(target[1] == "c"){
            renderPostCard(target[0])
            return
        }

    })

})

function renderPost(res){
    //console.log(res[0])
    post.innerHTML = ""

    for(i=res.length-1; i>=0; i--){
        let div = document.createElement("div")

        let card = renderCard(res[i])

        div.innerHTML = card
        post.append(div)
    }
}

function renderCard(data){
   
    let div = '<div class="card col-sm-6 col-md-8 m-3 border-0 ">'+
'<div class="card-header"><img src="https://via.placeholder.com/20X20"> ' + data.author + '</div>'+
'<img src=' + data.picture + ' class="card-img-top" alt="...">'+
'<div class="card-body">'+
'<p class="card-text"><span class="font-weight-bolder">'+ data.author + ' </span> '+ data.content +'</p>'+
'<img src="https://image.flaticon.com/icons/svg/833/833472.svg" id='+data.id + "like" + ' class="mr-1 imgWidth">'+
'<img src="https://image.flaticon.com/icons/svg/2636/2636351.svg" class="mr-1 imgWidth" id='+data.id + "comment" +' data-toggle="modal" data-target="#exampleModalLong">'+
'<img src="https://image.flaticon.com/icons/svg/1828/1828960.svg" class="mr-1 imgWidth">'+
'</div>'+
'</div>'

    return div
}

function addLikeToPost(target){
    console.log(target)
}

function renderPostCard(target){
    let title = document.getElementById("title")
    title.innerHTML = posters[target].author

    let div = '<img src=' + posters[target].picture + ' class="card-img-top" alt="...">'+
'<div class="card-body">'+
'<p class="card-text"><span class="font-weight-bolder"> ' + posters[target].author +'</span> ' + posters[target].content + '</p>'+
'<img src="https://image.flaticon.com/icons/svg/833/833472.svg" class="mr-1 imgWidth">'+
'<img src="https://image.flaticon.com/icons/svg/2636/2636351.svg" class="mr-1 imgWidth">'+
'<img src="https://image.flaticon.com/icons/svg/1828/1828960.svg" class="imgWidth">'+
'<p class="mt-3"> The Post is added : '+ posters[target].updatedAt + '</p>'

    let postCard = document.getElementById("cardPost")
    postCard.innerHTML = div
}

/**'<div class="card mb-3">' +
        '<div class="card-header"><img src="https://via.placeholder.com/25X25" class = "rounded-circle"> ' + data.author + '</div>' +
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
        '</div>' */