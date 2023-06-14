const zipcodeInput = document.getElementById("zipcode");
const button = document.getElementById("button-id");

// Weather API setup: tomorrow.io

// const fetch = require("node-fetch");
// const queryString = require("query-string");
// const moment = require("moment");

const getTimelineURL = "https://api.tomorrow.io/v4/timelines";
const apikey = "VaTD4KM7W4nSBR8fev6ibZwqfUxPG0I7";

let search_location = [40.758, -73.9855];

//list the fields
const fields = [
  "precipitationIntensity",
  "precipitationType",
  "windSpeed",
  "windGust",
  "windDirection",
  "temperature",
  "temperatureApparent",
  "cloudCover",
  "cloudBase",
  "cloudCeiling",
  "weatherCode",
];

// API results setup
const units = "imperial";
const timesteps = ["current", "1h", "1d"];

// configure the time frame up to 6 hours back and 15 days out
// const now = moment.utc();
// const startTime = moment.utc(now).add(0, "minutes").toISOString();
// const endTime = moment.utc(now).add(1, "days").toISOString();

const timezone = "America/New_York";

// request the timelines with all the query string parameters as options
// const getTimelineParameters = queryString.stringify(
//   {
//     apikey,
//     location,
//     fields,
//     units,
//     timesteps,
//     startTime,
//     endTime,
//     timezone,
//   },
//   { arrayFormat: "comma" }
// );

const paramsObj = {
  apikey: apikey,
  location: search_location,
  fields: fields,
  units: units,
  timesteps: timesteps,
  // startTime,
  // endTime,
  timezone: timezone,
};
const searchParams = new URLSearchParams(paramsObj);

console.log(searchParams.toString());

fetch(getTimelineURL + "?" + searchParams.toString(), {
  method: "GET",
  compress: true,
})
  .then((result) => result.json())
  .then((json) => console.log(json))
  .catch((error) => console.error("error: " + error));

button.addEventListener("click", getWeather);

function getWeather() {
  const zipcode = zipcodeInput.value;
  console.log(zipcode);

  //   fetch(
  //     `https://api.tomorrow.io/v4/timelines?location=${zipcode}&timesteps=1d&units=imperial&apikey=VaTD4KM7W4nSBR8fev6ibZwqfUxPG0I7`
  //   );
}

// const urlParams = new URLSearchParams("?type=list&page=20");
// const myParam = urlParams.get("type");

// console.log(myParam);

// for (const [key, value] of urlParams) {
//   console.log(`${key}: ${value}`);
// }
