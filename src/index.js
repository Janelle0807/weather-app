let now = new Date();
let dateNow = document.querySelector("#date-today");
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
dateNow.innerHTML = `Date today: ${month} ${date}, ${year}`;

let dayNow = document.querySelector("#day-of-the-week");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
dayNow.innerHTML = `${day}`;

let timeNow = document.querySelector("#time-now");
let hours = now.getHours();
let minutes = now.getMinutes();
timeNow.innerHTML = `${hours}:${minutes}`;
if (minutes < 10) {
  timeNow.innerHTML = `${hours}:0${minutes}`;
} else {
  timeNow.innerHTML = `${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "f5ed26972e5986fc6b40a4de3aefdb48";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp-now");
  temp.innerHTML = `${temperature}`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let weather = response.data.weather[0].main;
  let weatherCondition = document.querySelector("#weather");
  weatherCondition.innerHTML = `${weather}`;

  let highTemp = Math.round(response.data.main.temp_max);
  let high = document.querySelector("#high");
  high.innerHTML = `High: ${highTemp}℃`;

  let lowTemp = Math.round(response.data.main.temp_min);
  let low = document.querySelector("#low");
  low.innerHTML = `Low: ${lowTemp}℃`;

  document.querySelector("#city").innerHTML = response.data.name;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  celsiusTemperature = response.data.main.temp;
  
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCityTemp);

function searchCityTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

search("Tokyo");

function showPosition(position) {
  let apiKey = "f5ed26972e5986fc6b40a4de3aefdb48";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.lat}&lon=${position.coords.lon}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
}


let currentLoc = document.querySelector("#current-location");
currentLoc.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheittemp);



function showFahrenheittemp (event) {
  event.preventDefault();
  let fahrenheitTemp = (5 * 9) / 5 + 32;
  let temp = document.querySelector("#temp-now");
  temp.innerHTML = Math.round(fahrenheitTemp);
  
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiustemp);

function displayCelsiustemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-now");
  temp.innerHTML = Math.round(celsiusTemperature);
}