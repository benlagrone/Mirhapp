

loadImage("home-background","images/");
            
function loadImage(name,path){
    images[name] = new Image();
    images[name].onload = function(){
        resourceLoaded()
    }
    images[name].src = path + name + ".png";
}
          
function resourceLoaded(){
    numResourcesLoaded +=1
    if(numResourcesLoaded === totalResources){
        //setInterval(redraw, 1000 / fps);
        redraw("home");
    }
}
          
function redraw(page) {
    var x = charX;
    var y = charY;
    canvas.width = canvas.width;
    switch(page)
    {
        case "home":
            context.drawImage(images["home-background"], x, y);
            break;
        case "foo":
            break;
        default:
            if(page.substring(0,5)=="large"){
                context.drawImage(images["home-background"], x, y);
                loadImage(page.split("-")[1],"packages/starter/")
                context.drawImage(images[page.split("-")[1]], x, y);
            }
            if (page != "home" && page.split("-")[0]!="large"){
                context.drawImage(images["home-background"], x, y);
                drawRectangle();
            } 
    }                      
}


    
