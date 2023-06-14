const zipcodeInput = document.getElementById("zipcode");
const button = document.getElementById("button-id");

// return the weather API URL
function get_weatherAPI_URL(zipcode) {
  // Weather API setup: tomorrow.io
  const getTimelineURL = "https://api.tomorrow.io/v4/timelines";
  const apikey = "bLebZBiU0rLuVaqnLdP5kKsF8LCL83WD";

  // API results setup
  let search_location = zipcode;

  // list the fields
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

  const units = "imperial";
  const timesteps = ["current", "1h", "1d"];
  const timezone = "America/New_York";

  // configure the time frame up to 6 hours back and 15 days out
  const now = moment().local();
  const startTime = moment().local(now).add(0, "minutes").toISOString();
  const endTime = moment().local(now).add(4, "days").toISOString();

  // combine the parameters
  const paramsObj = {
    apikey: apikey,
    location: search_location,
    fields: fields,
    units: units,
    timesteps: timesteps,
    startTime: startTime,
    //   endTime: endTime,
    timezone: timezone,
  };

  const searchParams = new URLSearchParams(paramsObj);
  console.log(searchParams.toString());

  return getTimelineURL + "?" + searchParams.toString();
}

function getWeather() {
  const zipcode = zipcodeInput.value;
  console.log(zipcode);

  const url = get_weatherAPI_URL(zipcode);
  console.log(url);

  fetch(url, {
    method: "GET",
    compress: true,
  })
    .then((result) => result.json())
    .then((json) => console.log(json))
    .catch((error) => console.error("error: " + error));

  zipcodeInput.value = "";
}

button.addEventListener("click", getWeather);
