/**
 * Created by h205p3 on 2/15/17.
 */

var temp = 0;
var windmph = 0;
var windir = 0;
var wet = '';

function search() {
    var userSearch = document.getElementById("userSearch").value;
    var lon = 0;
    var lat = 0;
    $.ajax({
        url: ["https://api.mapbox.com/geocoding/v5/mapbox.places/" + userSearch + ".json?access_token=pk.eyJ1IjoidGVpZ2VzYiIsImEiOiJjaXpyYmpzd3gwMDF1MnFwY29qbG9qYzVsIn0.sxgtFCkke6Aqlie1kMdxTw"],
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (result) {
            console.log(result);
            lat = result.features[0].geometry.coordinates[0];
            lon = result.features[0].geometry.coordinates[1];
            weatherCheck(lon, lat);
            document.getElementById("place").innerHTML = result.features[0].place_name;
            document.getElementById("userSearch").value = "";
            testing()
        },
        error: function () {
            alert('Enter a place!');
        }
    });
}

function weatherCheck(lon, lat) {
    $.ajax({
        url: "https://api.darksky.net/forecast/984df1c3ecb015136e10fe33ed3c8205/" + lon + "," + lat,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function(ok) {
            console.log(ok);
            wet = ok.currently.icon;
            temp = ok.currently.temperature;
            windmph = ok.currently.windSpeed;
            windir = Math.round(ok.currently.windBearing);
            var dir = windDir(windir);
            weatherDress();
            document.getElementById("summ").innerHTML = ok.currently.summary;
            document.getElementById("tempf").innerHTML = "Temperature:" + " " + Math.round(temp) + " " +"°F and " + Math.round((temp - 32) * 5/9) + " " + "°C";
            document.getElementById("windy").innerHTML = "Wind Speed:" + " " + Math.round((windmph)) + " " + "MPH, in the " + dir + " direction";
            document.getElementById("lives").innerHTML =  "Humidity:" + " " + Math.round(ok.currently.humidity * 100) + "%";
            testing(wet)
        },
        error: function() {
            alert('Weather not working.');
            console.log(lon);
            console.log(lat)
        }
    });
}

function what (temp, wear) {
    if (temp < -5) {
        document.getElementById("dress").innerHTML = wear + "Wow. It's freezing. Dress up nice and cozy or you're gonna die."
    } else if (temp < 32) {
        document.getElementById("dress").innerHTML = wear + "It's pretty cold out! You should try wearing under layers and a jacket!"
    } else if (temp < 60) {
        document.getElementById("dress").innerHTML = wear + "Kinda chilly, but not too bad. Just throw a jacket over whatever you're wearing!"
    } else if (temp < 80) {
        document.getElementById("dress").innerHTML = wear + "It's pretty nice out, not too hot, not too cold. Should be fine, no under layers or jackets needed!"
    } else {
        document.getElementById("dress").innerHTML = wear + "Hot hot hot! Shorts and T Shirts! Go swimming!"
    }
}

function weatherDress() {
    if (wet == "rain") {
        what(temp, "It is raining. Sorry. ")
    } else if (windmph >= 20) {
            what(temp, "It's windy, a wind breaker would be nice! ")
        } else {
            what(temp, "")
        }
    }


function windDir(dir) {
    var just = '';
    if (dir == 0) {
        just = "North"
    } else if (dir == 90) {
        just = "East"
    } else if (dir == 180) {
        just = "South"
    } else if (dir == 270) {
        just = "West"
    } else if (dir > 0 && dir <= 45) {
        just = "North-east"
    } else if (dir > 45 && dir < 90) {
        just = "North-east-east"
    } else if (dir > 90 && dir <= 145) {
        just = "South-east-east"
    } else if  (dir > 145 && dir < 180) {
        just = "South-east"
    } else if (dir > 180 && dir <= 225) {
        just = "South-west"
    } else if (dir > 225 && dir < 270) {
        just = "South-west-west"
    } else if (dir > 270 && dir <= 315) {
        just = "North-west-west"
    } else if (dir > 315 && dir <= 359) {
        just = "North-west"
    }
    return just
}

function open() {
    $("#rain").hide();
    $("#sleet").hide();
    $("#snow").hide();
    $("#wind").hide();
    $("#fog").hide();
    $("#cloudy").hide();
    $("#clear-day").hide();
    $("#clear-night").hide();
    $("#partly-cloudy-day").hide();
    $("#partly-cloudy-night").hide();
}

function testing (what) {
    open();
    $("#" + what).show();

}