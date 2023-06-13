//Current Weather API Endpoint

var inputZip = document.getElementById("zipcode");

//href = curl --compressed --request GET --url \
//'https://api.tomorrow.io/v4/timelines?location=40.75872069597532,-73.98529171943665&fields=temperature&timesteps=1h&units=metric&apikey=VaTD4KM7W4nSBR8fev6ibZwqfUxPG0I7'
const button = document.getElementById("button-id");
button.addEventListener("click", function () {
  var zipValue = inputZip.value;
  var geoip = zipValue;
  fetch(
    `https://api.tomorrow.io/v4/timelines?location=${geoip}&timesteps=1d&units=imperial&apikey=VaTD4KM7W4nSBR8fev6ibZwqfUxPG0I7`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  var range = "30mi";
  var sort = "datetime_local.asc";
  var per_page = "15";
  var taxonomies = "";

  var seatgeek_url_with_arguments = `https://api.seatgeek.com/2/events?client_id=${seatgeek_client_id}&client_secret=${seatgeek_client_secret}&geoip=${geoip}&range=${range}&sort=${sort}&per_page=${per_page}&taxonomies.name=${taxonomies}`;
  // getEventData(seatgeek_url_with_arguments)
});

function retrieve() {
  fetch(
    "https://api.tomorrow.io/v4/timelines?location=40.75872069597532,-73.98529171943665&fields=temperature&timesteps=1h&units=metric&apikey=VaTD4KM7W4nSBR8fev6ibZwqfUxPG0I7"
  );

  if (btn) {
    btn.addEventListener("click", () => {
      console.log("btn clicked");
    });
  }
}

// document.addEventListener('DOMContentLoaded', function () {
//     el.addEventListener('click', swapper, false);
// });
