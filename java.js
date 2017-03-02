/**
 * Created by h205p3 on 2/15/17.
 */

function search() {
    var userSearch = document.getElementById("userSearch").value;
    var lon = 0;
    var lat = 0;
    $.ajax({
        url: ["https://api.mapbox.com/geocoding/v5/mapbox.places/" + userSearch + ".json?access_token=pk.eyJ1IjoidGVpZ2VzYiIsImEiOiJjaXpyYmpzd3gwMDF1MnFwY29qbG9qYzVsIn0.sxgtFCkke6Aqlie1kMdxTw"],
        type: 'GET',
    crossDomain: true,
        dataType: 'json',
        success: function(result) {
            console.log(result);
            console.log(result.features[0].geometry.coordinates[0]);
            console.log(result.features[0].geometry.coordinates[1]);
            lon = result.features[0].geometry.coordinates[0];
            lat = result.features[0].geometry.coordinates[1];
            console.log(lon);
            console.log(lat)
        },
    error: function() {
            alert('Please enter a place! Idiot...');
        }
});
    $.ajax({
        url: ["https://api.darksky.net/forecast/984df1c3ecb015136e10fe33ed3c8205/" + lon + "," + lat],
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function(cancer) {
            console.log(cancer);
            console.log(lon);
            console.log(lat)
        },
        error: function() {
            alert('Coordniates not working');
            console.log(lon);
            console.log(lat)
        }
    });
}

function someThing() {
    console.log(lonLat)
}

