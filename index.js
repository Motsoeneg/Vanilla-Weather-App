function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thurs", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
   
                <div class="col-2">
                  <div class="weather-forecast-day">${day}</div>
                  <img
                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-night.png"
                    alt=""
                    width="36"
                  />
                  <div class="weather-forecast-temperature">
                    <span class="weather-forecast-temp-max">22°</span>/
                    <span class="weather-forecast-temp-min">12°</span>
                  </div>
                </div>
              
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemp(response) {
  let temp = Math.round(celsiusTemperature);

  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${temp}`;

  celsiusTemperature = response.data.temperature.current;

  let h6 = document.querySelector("#city");
  h6.innerHTML = response.data.city;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#windSpeed");
  windElement.innerHTML = `${wind}`;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);
}
function search(city) {
  let apiKey = "2e190051baofeb04db4bce4a3b4t041f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=2e190051baofeb04db4bce4a3b4t041f`;
  axios.get(`${apiUrl}`).then(showTemp);
}

function searchEngine(event) {
  event.preventDefault();
  let cityinputElement = document.querySelector("#city-input");
  search(cityinputElement.value);
}

let click = document.querySelector("#search-form");
click.addEventListener("submit", searchEngine);

function displayfahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayfahrenheit);

let celsius = document.querySelector("#fahrenheit");
celsius.addEventListener("click", displayCelsius);

search("Durban");
displayForecast();
