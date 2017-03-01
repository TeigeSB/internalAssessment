/**
 * Created by h205p3 on 2/15/17.
 */


function search() {
    var userSearch = document.getElementById("userSearch").value;
    $.ajax({
        url: ["https://api.mapbox.com/geocoding/v5/mapbox.places/" + userSearch + ".json?access_token=pk.eyJ1IjoidGVpZ2VzYiIsImEiOiJjaXpyYmpzd3gwMDF1MnFwY29qbG9qYzVsIn0.sxgtFCkke6Aqlie1kMdxTw"],
        type: 'GET',
    crossDomain: true,
        dataType: 'json',
        success: function(result) {
            console.log(result)
        },
    error: function() {
            alert('Failed!');
        }
});
}

