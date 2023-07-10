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

let apiKey = "2e190051baofeb04db4bce4a3b4t041f";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=Pari&key=2e190051baofeb04db4bce4a3b4t041f";
function showTemp(response) {
  let temp = Math.round(response.data.temperature.current);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${temp}`;
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
//let click = document.querySelector("form");
//click.addEventListener("submit", form);
axios.get(`${apiUrl}`).then(showTemp);
