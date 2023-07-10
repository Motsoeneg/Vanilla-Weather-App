let apiKey = "2e190051baofeb04db4bce4a3b4t041f";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=Durban&key=2e190051baofeb04db4bce4a3b4t041f";

function showTemp(response) {
  console.log(response.data);
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
}
//let click = document.querySelector("form");
//click.addEventListener("submit", form);
axios.get(`${apiUrl}`).then(showTemp);
