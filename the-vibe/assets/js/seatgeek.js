var seatgeek_client_id = "MzQxNDQzNDF8MTY4NjEwMjgwNC4wNzc1ODk1";
var seatgeek_client_secret =
  "1b45269a11cd2685a79a76e3c63190c3a50f086fc0ab96dbee76db60aec91e0e";

function getEventData(url) {
  fetch(url).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        console.log(
          "-----------------------------------------------------------"
        );
      });
    } else {
      alert("ERROR" + response.statusText);
    }
  });
}

// var seatgeek_URL = `https://api.seatgeek.com/2/events?client_id=${seatgeek_client_id}&client_secret=${seatgeek_client_secret}`;
// getEventData(seatgeek_URL);

// Arguments:
var geoip = "30024";
var range = "30mi";
var sort = "datetime_local.asc";
var per_page = "25";
var taxonomies = "sports";
var performers = "";

var seatgeek_url_with_arguments = `https://api.seatgeek.com/2/events?client_id=${seatgeek_client_id}&client_secret=${seatgeek_client_secret}&geoip=${geoip}&range=${range}&sort=${sort}&per_page=${per_page}&taxonomies.name=${taxonomies}`;

getEventData(seatgeek_url_with_arguments);
