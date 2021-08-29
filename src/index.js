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
  
  getForecast(response.data.coord);
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
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temp = document.querySelector("#temp-now");
  temp.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiustemp);

function displayCelsiustemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-now");
  temp.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#fivedayforecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML = forecastHTML +
        `<div class="col -2">
            <div class="weather-forecast-day">
            ${formatDay(forecastDay.dt)}
            </div>
            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="43" />
            <div class="weather-forecast-temp">
              <span class="weather-forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span>
              <span class="weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
            </div>
          </div> `;
    }
  });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML; 
}

function getForecast(coordinates) {
  let apiKey = "f5ed26972e5986fc6b40a4de3aefdb48";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return days[day];
}



  
displayForecast();

