/**
 * Created by h205p3 on 2/15/17.
 */

var temp = 0

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
            console.log(ok);
            temp = ok.currently.temperature;
            weatherDress();
            document.getElementById("temp").innerHTML = "Temperature:" + " " + ok.currently.temperature + " " +"°F";
            document.getElementById("lives").innerHTML =  "Humidity:" + " " + ok.currently.humidity * 100 + "%";

        },
        error: function() {
            alert('Weather not working.');
            console.log(lon);
            console.log(lat)
        }
    });
}

function weatherDress() {
    var dress = prompt("Do you dress like a male or female?");
    if (dress = "male".toLowerCase()) {
        console.log("MAAAN");
        var how = howToDressM();
    } else if (dress = "female".toLowerCase()) {
        console.log("GIIIIRL");
        var wow = howToDressF();
    }

}

function howToDressM() {
    var ans = prompt("Do you want to dress formal or casual?");
    if (ans = "Formal".toLowerCase()) {
        if (temp < 32) {
            document.getElementById("dress").innerHTML = "Wow, it's pretty cold out! You should try wearing layers under your formal wear!"
        } else if (temp < 55) {
            document.getElementById("dress").innerHTML = "Kinda chilly, but not too bad. Just throw thick jacket over whatever you're wearing!"
        }
    }

}

