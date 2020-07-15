//Post.create({title:"The Cam", author:"Yanxi", content:"The Photograpy" , picture: "https://images.unsplash.com/photo-1480365501497-199581be0e66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"})
let posters 
let post = document.getElementById("posters")

window.addEventListener("load", function(){

    posters = Post.all()

    renderPost(posters)

    post.addEventListener("click", function(){
        let target = event.target.id
        console.log(target)
        if(target[1] == "l"){
            //console.log(target)
            addLikeToPost(target[0])
        }
        if(target[1] == "c"){
            renderComment(target[0])
        }
    
    })
})

function renderPost(res){
    //console.log(res[0])
    post.innerHTML = ""

    for(i=0; i<res.length; i++){
        let div = document.createElement("div")

        let card = renderCard(res[i])

        div.innerHTML = card
       // console.log(card)
        post.append(div)
    }
}

function renderCard(data){
    
    let div = '<div class="card mb-3">'+
'<div class="card-header"><img src="https://via.placeholder.com/20X20"> ' + data.author + '</div>'+
'<img src=' + data.picture + ' class="card-img-top" alt="...">'+
'<div class="card-body">'+
'<p class="card-text"><span class="font-weight-bolder">'+ data.author + ' </span> '+ data.content +'</p>'+
'<img src="https://image.flaticon.com/icons/svg/833/833472.svg" id='+data.id + "like" +' class="mr-1 imgWidth">'+
'<img src="https://image.flaticon.com/icons/svg/2636/2636351.svg" data-toggle="modal" data-target="#exampleModal" class="mr-1 imgWidth" id='+data.id + "comment" +'>'+
'<img src="https://image.flaticon.com/icons/svg/1828/1828960.svg" class="mr-1 imgWidth">'+
'</div>'+
'</div>'

    return div
}

function renderComment(target){
    console.log(target)
}

function addLikeToPost(target){
    //Post.addLike(target, )
}