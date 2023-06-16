const zipcodeInput = document.getElementById("zipcode");

const weatherCodeAnswers = {
  0: "Unknown",
  1000: "Clear, Sunny",
  1100: "Mostly Clear",
  1101: "Partly Cloudy",
  1102: "Mostly Cloudy",
  1001: "Cloudy",
  1103: "Partly Cloudy and Mostly Clear",
  2100: "Light Fog",
  2101: "Mostly Clear and Light Fog",
  2102: "Partly Cloudy and Light Fog",
  2103: "Mostly Cloudy and Light Fog",
  2106: "Mostly Clear and Fog",
  2107: "Partly Cloudy and Fog",
  2108: "Mostly Cloudy and Fog",
  2000: "Fog",
  4204: "Partly Cloudy and Drizzle",
  4203: "Mostly Clear and Drizzle",
  4205: "Mostly Cloudy and Drizzle",
  4000: "Drizzle",
  4200: "Light Rain",
  4213: "Mostly Clear and Light Rain",
  4214: "Partly Cloudy and Light Rain",
  4215: "Mostly Cloudy and Light Rain",
  4209: "Mostly Clear and Rain",
  4208: "Partly Cloudy and Rain",
  4210: "Mostly Cloudy and Rain",
  4001: "Rain",
  4211: "Mostly Clear and Heavy Rain",
  4202: "Partly Cloudy and Heavy Rain",
  4212: "Mostly Cloudy and Heavy Rain",
  4201: "Heavy Rain",
  5115: "Mostly Clear and Flurries",
  5116: "Partly Cloudy and Flurries",
  5117: "Mostly Cloudy and Flurries",
  5001: "Flurries",
  5100: "Light Snow",
  5102: "Mostly Clear and Light Snow",
  5103: "Partly Cloudy and Light Snow",
  5104: "Mostly Cloudy and Light Snow",
  5122: "Drizzle and Light Snow",
  5105: "Mostly Clear and Snow",
  5106: "Partly Cloudy and Snow",
  5107: "Mostly Cloudy and Snow",
  5000: "Snow",
  5101: "Heavy Snow",
  5119: "Mostly Clear and Heavy Snow",
  5120: "Partly Cloudy and Heavy Snow",
  5121: "Mostly Cloudy and Heavy Snow",
  5110: "Drizzle and Snow",
  5108: "Rain and Snow",
  5114: "Snow and Freezing Rain",
  5112: "Snow and Ice Pellets",
  6000: "Freezing Drizzle",
  6003: "Mostly Clear and Freezing drizzle",
  6002: "Partly Cloudy and Freezing drizzle",
  6004: "Mostly Cloudy and Freezing drizzle",
  6204: "Drizzle and Freezing Drizzle",
  6206: "Light Rain and Freezing Drizzle",
  6205: "Mostly Clear and Light Freezing Rain",
  6203: "Partly Cloudy and Light Freezing Rain",
  6209: "Mostly Cloudy and Light Freezing Rain",
  6200: "Light Freezing Rain",
  6213: "Mostly Clear and Freezing Rain",
  6214: "Partly Cloudy and Freezing Rain",
  6215: "Mostly Cloudy and Freezing Rain",
  6001: "Freezing Rain",
  6212: "Drizzle and Freezing Rain",
  6220: "Light Rain and Freezing Rain",
  6222: "Rain and Freezing Rain",
  6207: "Mostly Clear and Heavy Freezing Rain",
  6202: "Partly Cloudy and Heavy Freezing Rain",
  6208: "Mostly Cloudy and Heavy Freezing Rain",
  6201: "Heavy Freezing Rain",
  7110: "Mostly Clear and Light Ice Pellets",
  7111: "Partly Cloudy and Light Ice Pellets",
  7112: "Mostly Cloudy and Light Ice Pellets",
  7102: "Light Ice Pellets",
  7108: "Mostly Clear and Ice Pellets",
  7107: "Partly Cloudy and Ice Pellets",
  7109: "Mostly Cloudy and Ice Pellets",
  7000: "Ice Pellets",
  7105: "Drizzle and Ice Pellets",
  7106: "Freezing Rain and Ice Pellets",
  7115: "Light Rain and Ice Pellets",
  7117: "Rain and Ice Pellets",
  7103: "Freezing Rain and Heavy Ice Pellets",
  7113: "Mostly Clear and Heavy Ice Pellets",
  7114: "Partly Cloudy and Heavy Ice Pellets",
  7116: "Mostly Cloudy and Heavy Ice Pellets",
  7101: "Heavy Ice Pellets",
  8001: "Mostly Clear and Thunderstorm",
  8003: "Partly Cloudy and Thunderstorm",
  8002: "Mostly Cloudy and Thunderstorm",
  8000: "Thunderstorm",
};

const precipitationTypeAnswers = {
  0: "N/A",
  1: "Rain",
  2: "Snow",
  3: "Freezing Rain",
  4: "Ice Pellets",
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
    // "windDirection",
    "temperature",
    // "temperatureApparent",
    // "cloudCover",
    // "cloudBase",
    // "cloudCeiling",
    "weatherCodeFullDay",
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
    const weather =
      weatherCodeAnswers[weatherForcasts[i].values.weatherCodeFullDay];
    const windSpeed = weatherForcasts[i].values.windSpeed;
    const windGust = weatherForcasts[i].values.windGust;
    const precipitationType =
      precipitationTypeAnswers[weatherForcasts[i].values.precipitationType];
    const precipitationIntensity =
      weatherForcasts[i].values.precipitationIntensity;

    console.log("Day: " + i);
    console.log("Date: " + date);
    console.log("Temperature: " + temperature);
    console.log("Weather: " + weather);
    console.log(`Wind Speed: ${windSpeed} mph`);
    console.log(`Wind gust: ${windGust} mph`);
    console.log(`Precipitation Tpye: ${precipitationType}`);
    console.log(`Precipitation intensity: ${precipitationIntensity} in/hr`);
  }
}

button.addEventListener("click", getWeather);
