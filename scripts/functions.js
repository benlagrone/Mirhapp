var methods = {
    "methods":[{
        Method:"MWL",
        Description:"Muslim World League"
    },{
        Method:"ISNA",
        Description:"Islamic Society of North America"
    },{
        Method:"Egypt",
        Description:"Egyptian General Authority of Survey"
    },{
        Method:"Makkah",
        Description:"Umm al-Qura University, Makkah"
    },{
        Method:"Karachi",
        Description:"University of Islamic Sciences, Karachi"
    },{
        Method:"Tehran",
        Description:"Institute of Geophysics, University of Tehran"
    },{
        Method:"Jafari",
        Description:"Shia Ithna Ashari (Ja`fari)"
    }]
}

var url = "http://api.geonames.org/timezoneJSON?lat=" + localStorage.getItem('myLat') + "&lng=" + localStorage.getItem('myLon') + "&username=mirhapp"

var playState = "off";

var myTimesMethod = "ISNA"

var timeZoneJson = (function () {
    var timeZoneJson = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': url,
        'dataType': "json",
        'success': function (data) {
            timeZoneJson = data;
        }
    });
    return timeZoneJson;
})(); 

var getPrayTimes = prayTimes.getTimes(new Date(), [localStorage.getItem('myLat'), localStorage.getItem('myLon')], timeZoneJson["rawOffset"]);
/*Location vars*/
var images = {}
var context = document.getElementById('canvas').getContext("2d");        
var charX = 0;
var charY = 0;     
var totalResources = 1;
var numResourcesLoaded = 0;
var fps = 1; 
drawButtons("home");



localStorage.setItem('timesMethod',myTimesMethod)
  
//localStorage.setItem('deviceTimeZone',makeCounter().theTimeZone())
prayTimes.setMethod(localStorage.getItem('timesMethod')); 


function drawButtons(page){
    var pageHtml = "";
    switch(page)
    {
        case "home":
            pageHtml += "<div class ='row'>";
            for (var key in package["starter"]){
                if (key % 2 === 0 ){
                    pageHtml += "<div class ='row'>";
                }
                //make home buttons
                pageHtml += "<div class='span3'><div class='tile'>"
                pageHtml += "<style>button[data-name='"+package["starter"][key]["image"]+"']{background:url(packages/starter/"+package["starter"][key]["image"]+".png)}</style>";
                pageHtml += "<button data-name='"+ package["starter"][key]["image"] +"'>"
                pageHtml += "<a class=''>" + package["starter"][key]["name"] + "</a></button></div></div>";
                if (key % 2 != 0 ){
                    pageHtml += "</div>"
                }
            };   
            pageHtml += "</div>";
            if (clockInterval == undefined){
            console.log(clockInterval)
            }
            break;
        case "times":
            makeCounter().refreshTime();
            pageHtml +="<div><a data-name='home'>Home</a></div>";
            pageHtml +="<div class='time'><span>Your Time</span><span id='clock'>"+ makeCounter().theTime() +"</span></div><ul>"
            for (var key in getPrayTimes){
                pageHtml += "<li><span>" + key + "</span><span>"+getPrayTimes[key]+"</span><span><input type='checkbox' value" + key + "></span></li>";
            }
            pageHtml +="</ul>";
            pageHtml +="</div>";
            
            var getClock = makeCounter().writeClock();

            var checkClock = function(){
                getClock;
                console.log(getClock)
            }
    
            var clockInterval = setInterval(checkClock, 1000 / 2);

            break;
        default:
            for (var key in package["starter"]){
                if (package["starter"][key]["image"] == page){
                    pageHtml += "<div'><a data-name='home'>Home</a><a data-name='times'>Prayer Times</a></div>";
                    pageHtml += "<style>button[data-name='large-"+package["starter"][key]["image"]+"']{background:url(packages/starter/"+package["starter"][key]["image"]+".png)}</style>"; 
                    pageHtml += "<button class='large' data-name='large-"+package["starter"][key]["image"]+"'>Show the Mirhab</button>"
                    pageHtml += "<article>" + package["starter"][key]["description"] + "<article>";
                }
            }
            if(page.substring(0,5)=="large"){
                pageHtml += "<div class='span3'><a data-name='home' class=''>Home</a></div>";
            }
            if (clockInterval == undefined){
            console.log(clockInterval)
            }
    }
    //put the buttons on the page, over the canvas
    $("#page").append(pageHtml);
    //then add event listeners
    $("a").click(function(){
        buttonClick($(this).data("name"))
    })
    $("button").click(function(){
        buttonClick($(this).data("name"))
    })
};


function buttonClick(buttonID){
    switch(buttonID)
    {
        case "home":
            $("#page").children().remove();
            drawButtons(buttonID);
            redraw(buttonID);
            break;
        case "foo":
            $("#page").children().remove();
            drawButtons(buttonID)
            redraw(buttonID)
            break;
        case "play":
            break;
        case "stop":
            break;
        case "times":
            $("#page").children().remove();
            drawButtons(buttonID);
            break;
        default:
            $("#page").children().remove();
            drawButtons(buttonID);
            redraw(buttonID);      
    }
}


function drawRectangle(){
    context.beginPath();
    context.rect(20, 600, 600, 470);
    context.fillStyle = 'white';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = 'black';
    context.stroke();
}

    
var makeCounter = function(){
    var currentTime = 0;
    return{
        theTime : function(){
            var currentTime = new Date();
            //console.log(currentTime)
            return currentTime.getHours() + ':' + currentTime.getMinutes().toFixed(2);
        },
        theTimeZone : function(){
            var currentTime = new Date();
            //console.log(currentTime)
            return currentTime.getTimezoneOffset()/60;
        },
        writeClock : function(){
            var currentTime = new Date();
            console.log(currentTime);
            return currentTime;
        },
        refreshTime : function(){
            var currentTime = new Date();
        //console.log(currentTime)
        }
    }
}

var getTime = makeCounter().theTime();
var refreshTime = makeCounter().refreshTime();

var checkTime = function(){
    //makeCounter().refreshTime()
    for (var key in getPrayTimes){
        function pad(number) {
            return (number < 10 ? '0' : '') + number
        }
        if (getPrayTimes[key] == (getTime < 10 ? '0' : '') + getTime){
        //console.log(key)
        }
    }
    
}
var timeInterval = setInterval(checkTime, 1000 / 2);