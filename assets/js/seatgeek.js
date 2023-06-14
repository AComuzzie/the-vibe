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

  for (var i = 0; i < eventList.length; i++) {
    console.log("=====================");
    console.log("Event: " + i);
    var title = eventList[i].title;
    var type = eventList[i].type;
    var date = eventList[i].datetime_local;
    var url = eventList[i].url;
    var address = `${eventList[i].venue.name}: ${eventList[i].venue.address}, ${eventList[i].venue.extended_address}`;
    console.log("Title: " + title);
    console.log("Type: " + type);
    console.log("Date: " + date);
    console.log("URL: " + url);
    console.log("Address: " + address);
  }
}

// var seatgeek_URL = `https://api.seatgeek.com/2/events?client_id=${seatgeek_client_id}&client_secret=${seatgeek_client_secret}`;
// getEventData(seatgeek_URL);



// getEventData(seatgeek_url_with_arguments);
