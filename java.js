/**
 * Created by h205p3 on 2/15/17.
 */

var temp = 0;
var windmph = 0;

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
            document.getElementById("userSearch").innerHTML = ""
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
            document.getElementById("dress").innerHTML = "";
            console.log(ok);
            temp = ok.currently.temperature;
            windmph = ok.currently.windSpeed;
            console.log(windmph);
            weatherDress();
            document.getElementById("tempf").innerHTML = "Temperature:" + " " + Math.round(ok.currently.temperature) + " " +"°F";
            document.getElementById("tempc").innerHTML = "Temperature:" + " " + Math.round((ok.currently.temperature - 32) * 5/9) + " " +"°C";
            document.getElementById("wind").innerHTML = "Wind Speed:" + " " + Math.round((ok.currently.windSpeed)) + " " + "MPH";
            document.getElementById("lives").innerHTML =  "Humidity:" + " " + Math.round(ok.currently.humidity * 100) + "%";
        },
        error: function() {
            alert('Weather not working.');
            console.log(lon);
            console.log(lat)
        }
    });
}

function weatherDress() {
    if (windmph >= 25) {
        document.getElementById("dress").innerHTML = "It's windy, wind breaker would be nice!"
    }
    if (temp < 32) {
        document.getElementById("dress").innerHTML += "Wow, it's pretty cold out! You should try wearing under layers and a jacket!"
    } else if (temp < 60) {
        document.getElementById("dress").innerHTML += "Kinda chilly, but not too bad. Just throw thick jacket over whatever you're wearing!"
    } else if (temp < 75) {
        document.getElementById("dress").innerHTML += "It's pretty nice out, not too hot, not too cold. Should be fine, no under layers or jackets needed!"
    }
}

