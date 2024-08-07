console.log("WeatherWhiz | Developed by Rahul Morya © 2024 ");

// DOM elements
const display_data = document.getElementById("display_weather");
const fetching = document.getElementById("fetch");
const confirmation = document.getElementById("confirmation");

// Weather icons mapping
const weatherIcons = {
  Sunny: "🌞",
  Clear: "🌞",
  Cloudy: "☁️",
  "Partly Cloudy": "🌥️",
  "Mostly Cloudy": "☁️",
  Overcast: "☁️",
  Rainy: "🌧️",
  Showers: "🌦️",
  Stormy: "⛈️",
  Thunderstorm: "⛈️",
  Drizzle: "🌦️",
  Windy: "🌬️",
  Breezy: "🌬️",
  Snowy: "❄️",
  Blizzard: "❄️",
  Sleet: "🌨️",
  Hail: "🌨️",
  Foggy: "🌫️",
  Mist: "🌫️",
  Hazy: "🌫️",
  Smoke: "🌫️",
  Dust: "🌫️",
  Sand: "🌫️",
  Hot: "🔥",
  Cold: "❄️",
  Ice: "❄️",
  Frost: "❄️",
  "Freezing Rain": "🌧️",
  Tornado: "🌪️",
  Hurricane: "🌀",
};

// Weather images mapping
const weatherImage = {
  Sunny: "src/img/Sunny.webp",
  Clear: "src/img/Sunny.webp",
  Cloudy: "src/img/Cloudy.webp",
  "Partly Cloudy": "src/img/Partly-Cloudy.webp",
  "Mostly Cloudy": "src/img/Cloudy.webp",
  Overcast: "src/img/Cloudy.webp",
  Rainy: "src/img/Rainy.webp",
  Showers: "src/img/Showers.webp",
  Stormy: "src/img/Stormy.webp",
  Thunderstorm: "src/img/Stormy.webp",
  Drizzle: "src/img/Showers.webp",
  Windy: "src/img/Windy.webp",
  Breezy: "src/img/Windy.webp",
  Snowy: "src/img/Snowy.webp",
  Blizzard: "src/img/Blizzard.webp",
  Sleet: "src/img/Sleet.webp",
  Hail: "src/img/Hail.webp",
  Foggy: "src/img/Foggy.webp",
  Mist: "src/img/Foggy.webp",
  Hazy: "src/img/Hazy.webp",
  Hot: "src/img/Hot.webp",
};

// API options
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "007ab335b5msh85b802624dacb60p1d9d83jsn99e0af711933",
    "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
  },
};

// Function to get weather data for the specified location
function locationWeather() {
  const city = document.getElementById("set_location").value;
  const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;
  fetching.style.visibility = "visible";
  fetching.innerHTML = "Fetching....";
  fetchWeather(url);
}

// Function to fetch weather data from API
async function fetchWeather(url) {
  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Parse as JSON directly
    if (
      result.message &&
      result.message.includes(
        "You have exceeded the MONTHLY quota for Requests"
      )
    ) {
      fetching.innerHTML = `Monthly quota exceeded. Please try again next month or upgrade your plan.`;
      fetching.className = "";
    } else {
      console.log(result);
      displayWeather(result); // Call a function to display the weather data
    }
  } catch (error) {
    console.error(error);
    fetching.innerHTML = `Unable to Fetch due to error -> ${error}`;
    fetching.className = "";
  }
}

// Function to display weather data on the webpage
function displayWeather(data) {
  display_data.style.display = "flex";
  fetching.style.visibility = "hidden";
  confirmation.innerHTML = `<p>If incorrect location then try searching again</p>`;
  const temperatureF = data.current_observation.condition.temperature;
  const temperatureC = (((temperatureF - 32) * 5) / 9).toFixed(1); // Convert to Celsius and round to 1 decimal place
  const windtemperatureF = data.current_observation.wind.chill;
  const windtemperatureC = (((windtemperatureF - 32) * 5) / 9).toFixed(1); // Convert to Celsius and round to 1 decimal place
  const weatherDescription = data.current_observation.condition.text;
  const weatherIcon = weatherIcons[weatherDescription] || "❓"; // Default to a question mark if not found
  const images = weatherImage[weatherDescription];

  document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.65)),url('${images}')`;
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";

  const location = document.getElementById("Location");
  location.innerHTML = `<div><p>Weather at<a href='https://www.google.com/maps/@${data.location.lat},${data.location.long},12z' style="text-decoration:none;"> <i class="fa fa-map-marker" style="font-size:24px"></i> ${data.location.city}, ${data.location.country} </a> </p> <b>Timezone: </b> ${data.location.timezone_id}</div> `;

  const condition = document.getElementById("Condition");
  condition.innerHTML = `<b>Feels like </b>${temperatureC} °C <br><b> Weather Description :</b> ${data.current_observation.condition.text}  ${weatherIcon}`;

  const wind = document.getElementById("Wind");
  wind.innerHTML = `<b>Wind 's Chill :</b> ${windtemperatureC} °C ,<b> Direction:</b> ${data.current_observation.wind.direction},<b> Speed: </b>${data.current_observation.wind.speed} km/h`;

  const atmosphere = document.getElementById("Atmosphere");
  atmosphere.innerHTML = `<b>Humidity: </b> ${data.current_observation.atmosphere.humidity}%, <b>Visibilty:</b> ${data.current_observation.atmosphere.visibility}km, <b>Pressure:</b> ${data.current_observation.atmosphere.pressure}mb`;

  const astronomy = document.getElementById("Astronomy");
  astronomy.innerHTML = `<b>Sunrise: </b>${data.current_observation.astronomy.sunrise}, <b>Sunset:</b> ${data.current_observation.astronomy.sunset}`;
}
