
function success(position) {
    var location = position.coords.latitude + ',' + position.coords.longitude;
    localStorage.setItem('myTime',new Date().getTime())
    localStorage.setItem('myLon',position.coords.longitude)
    localStorage.setItem('myLat',position.coords.latitude)
}
 
function error(msg) {
    // select the span with id status
    var s = $('#status');
    // set the error message
    s.html(typeof msg == 'string' ? msg : "failed");
}

if (navigator.geolocation) {
    var foo = navigator.geolocation.getCurrentPosition(success, error);
} else {
    error('not supported');
}


