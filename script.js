// ⏰Feature #1 Display current date & time
function formatDate(now) {
  let hour = now.getHours();
  let date = now.getDate();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = now.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saterday",
  ];

  let dayIndex = now.getDay();
  let day = days[dayIndex];

  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  return `${day} ${month} ${date} ${hour}:${minutes} ${year}`;
}

// 🕵️‍♀️Feature #2 Display the name & current temperature of the city submitted by user
//  Details : API Call top OpenWeather for https reponse from servers

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "078db4e136e212a8147d77a8cd2054b4";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//🙀Feature #3.1 Convert the temperature from celcius to fahrenheit

function changeToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#main-temp");
  let temperature = temp.innerHTML;
  temperature = Number(temperature);

  let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);
  temp.innerHTML = fahrenheitTemperature;
}

let fahrenheit = document.querySelector("#click-fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

//🙀Feature #3.2 Convert the temperature from fahrenheit to celcius

function changeToCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#main-temp");
  let temperature = temp.innerHTML;
  temperature = Number(temperature);
  let celciusTemperature = Math.round(((temperature - 32) * 5) / 9);
  temp.innerHTML = celciusTemperature;
}

let instant = document.querySelector("#date");
let currentTime = new Date();
instant.innerHTML = formatDate(currentTime);

let celcius = document.querySelector("#click-celcius");
celcius.addEventListener("click", changeToCelcius);

let position = document.querySelector("#my-position");
position.addEventListener("click", getCurrentLocation);

let city = document.querySelector("#city-form");
city.addEventListener("submit", handleSubmit);

searchCity("Marseille");

//<i class="large material-icons" id="location">location_on</i>
