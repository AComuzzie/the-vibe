const zipcodeInput = document.getElementById("zipcode");
const button = document.getElementById("button-id");

const weatherCodeAnswers = {
  0: "Unknown",
  1000: "Clear",
  1001: "Cloudy",
  1100: "Mostly Clear",
  1101: "Partly Cloudy",
  1102: "Mostly Cloudy",
  2000: "Fog",
  2100: "Light Fog",
  3000: "Light Wind",
  3001: "Wind",
  3002: "Strong Wind",
  4000: "Drizzle",
  4001: "Rain",
  4200: "Light Rain",
  4201: "Heavy Rain",
  5000: "Snow",
  5001: "Flurries",
  5100: "Light Snow",
  5101: "Heavy Snow",
  6000: "Freezing Drizzle",
  6001: "Freezing Rain",
  6200: "Light Freezing Rain",
  6201: "Heavy Freezing Rain",
  7000: "Ice Pellets",
  7101: "Heavy Ice Pellets",
  7102: "Light Ice Pellets",
  8000: "Thunderstorm",
};

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
  const timesteps = ["1d"];
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
    .then(outputWeatherData)
    .catch((error) => console.error("error: " + error));

  zipcodeInput.value = "";
}

function outputWeatherData(data) {
  console.log(data);

  const weatherForcasts = data.data.timelines[0].intervals;
  for (let i = 0; i < weatherForcasts.length; i++) {
    const date = weatherForcasts[i].startTime;
    const temperature = weatherForcasts[i].values.temperature;
    const weatherCode = weatherForcasts[i].values.weatherCode;
    const weather = weatherCodeAnswers[weatherCode];

    console.log("Day: " + i);
    console.log("Date: " + date);
    console.log("Temperature: " + temperature);
    console.log("Weather: " + weather);
  }
}

button.addEventListener("click", getWeather);
