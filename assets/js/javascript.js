var eventsCards = document.getElementById("events");
var inputZip = document.getElementById("zipcode");

const button = document.getElementById("button-id");
button.addEventListener("click", function () {
  var zipValue = inputZip.value;
  var geoip = zipValue;
  var range = "30mi";
  var sort = "datetime_local.asc";
  var per_page = "15";
  var taxonomies = "";

  var seatgeek_url_with_arguments = `https://api.seatgeek.com/2/events?client_id=${seatgeek_client_id}&client_secret=${seatgeek_client_secret}&geoip=${geoip}&range=${range}&sort=${sort}&per_page=${per_page}&taxonomies.name=${taxonomies}`;
  getEventData(seatgeek_url_with_arguments);
});


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
        processData(data.events);
      });
    } else {
      console.log("ERROR" + response.statusText);
    }
  });
}

function processData(eventList) {
  if (eventList.length === 0) {
    console.log("No events found");
    return;
  }
  localStorage.setItem("eventList", JSON.stringify(eventList));
  var pulledEventList = JSON.parse(localStorage.getItem("eventList"));
  for (var i = 0; i < pulledEventList.length; i++) {
    console.log("=====================");
    console.log("Event: " + i);
    var title = pulledEventList[i].title;
    var type = pulledEventList[i].type;
    var date = pulledEventList[i].datetime_local;
    var newDate = new Date(date);
    var formattedDate = newDate.toLocaleString();
    var url = pulledEventList[i].url;
    var address = `${pulledEventList[i].venue.name}: ${pulledEventList[i].venue.address}, ${pulledEventList[i].venue.extended_address}`;
    console.log("Title: " + title);
    console.log("Type: " + type);
    console.log("Date: " + date);
    console.log("URL: " + url);
    console.log("Address: " + address);

    var eventCard = document.createElement("div");
    eventCard.className = "card";
    eventCard.classList.add("bg-slate-800", "border-2", "border-green-400", "m-1", "mr-5");
    var eventCardContent = document.createElement("div");
    eventCardContent.className = "card-content";
    eventCard.appendChild(eventCardContent);
    var eventContent = document.createElement("ul");
    eventContent.className = "content";
    var eventPerformer = document.createElement("li");
    var eventLocation = document.createElement("li");
    var eventTime = document.createElement("li");
    var eventURL = document.createElement("a");
    eventPerformer.className = "has-text-light";
    eventLocation.className = "has-text-light";
    eventTime.className = "has-text-light";
    eventURL.className = "has-text-primary";

    eventPerformer.textContent = "Event: " + title;
    eventTime.textContent = "Date: " + formattedDate;
    eventLocation.textContent = "Address: " + address;
    eventURL.href = url;
    eventURL.target = "_blank";
    eventURL.innerText = "View Seats / Get Tickets!";

    eventContent.appendChild(eventPerformer);
    eventContent.appendChild(eventTime);
    eventContent.appendChild(eventLocation);
    eventContent.appendChild(eventURL);
    eventCardContent.appendChild(eventContent);
    eventsCards.appendChild(eventCard);
  }
}
