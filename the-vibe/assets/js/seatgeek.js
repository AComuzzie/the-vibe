var seatgeek_client_id = "MzQxNDQzNDF8MTY4NjEwMjgwNC4wNzc1ODk1";
var seatgeek_client_secret =
  "1b45269a11cd2685a79a76e3c63190c3a50f086fc0ab96dbee76db60aec91e0e";

var seatgeek_URL = `https://api.seatgeek.com/2/events?client_id=${seatgeek_client_id}&client_secret=${seatgeek_client_secret}`;

fetch(seatgeek_URL).then(function (response) {
  if (response.ok) {
    console.log(response);
    response.json().then(function (data) {
      console.log(data);
    });
  } else {
    alert("ERROR" + response.statusText);
  }
});