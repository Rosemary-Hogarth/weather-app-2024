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

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let dateOfMonth = date.getDate();

  return `${day} | ${month} ${dateOfMonth} | ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let maxTemperature = Math.round(forecastDay.temperature.maximum);
      let container = document.querySelector(".container");
      if (maxTemperature > 20) {
        container.style.background = "linear-gradient(243deg, rgb(255, 253, 221) 13.4%, rgb(248, 215, 215) 82.1%)"; // Set the background color to red
      } else {
        container.style.background = "linear-gradient(113.5deg, rgb(234, 234, 234) 22.3%, rgb(201, 234, 211) 56.6%, rgb(255, 180, 189) 90.9%)";
      }

      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>

        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          class="forecast-icon"
        />
        <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temperature.maximum
        )}°</span>
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temperature.minimum
          )}°</span>
        </div>
      </div>
  `;
    }

  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b75146af46et20c8d83f2ao3006e4a7d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//let temp = Math.round(response.data.main.temp) --> data fetched from the json data sheet on openweather using apiUrl
//.documentqueryselector links the js to the html id
//currentTemp.innerHTML = temp displays the data in the html so you can see it on the webpage

function displayTemp(response) {
  let temperatureElement = document.querySelector("#temperature");

  let description = response.data.condition.description;
  let currentDescription = document.querySelector("#current-description");

  let humidity = response.data.temperature.humidity;
  let currentHumidity = document.querySelector("#humidity");

  let pressure = response.data.temperature.pressure;
  let currentPressure = document.querySelector("#pressure");

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let city = response.data.city;
  let currentCity = document.querySelector("#cityInput");

  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  currentDescription.innerHTML = description;
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  currentPressure.innerHTML = `Pressure: ${pressure} mb`;
  currentWind.innerHTML = `Wind: ${wind} m/s`;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  currentCity.innerHTML = `${city}`;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.coordinates);
}

//axios makes HTTP requests from the browser and handles the transformation of request and response data.
//here it uses the url to pull all the data in the displayTemp function.

function search(city) {
  let apiKey = "b75146af46et20c8d83f2ao3006e4a7d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

//the event here is the form being submitted when the user searches for a city.
function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  search(citySearch.value);
}

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

// function currentPosition(position) {
//   lon = position.coords.longitude;
//   lat = position.coords.latitude;

//   let apiKey = "b75146af46et20c8d83f2ao3006e4a7d";
//   let units = "metric";
//   let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=${units}`;

//   //axios pulls all the data from displayTemp but for the current location.
//   https: axios.get(apiUrl).then(displayTemp);
// }

// //this function uses the geolocation navigator to find the user's current lon and lat
// function searchPosition(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(currentPosition);
// }

// when the form is used and the city is submitted, the event listener calls the showCityName function.

let searchButton = document.querySelector("#temp");
searchButton.addEventListener("click", displayTemp);

//when the current button is clicked, the event listener calls the searchPosition function
// let currentLocationButton = document.querySelector("#current-location");
// currentLocationButton.addEventListener("click", searchPosition);



function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Berlin");



// function displayFahrenheitTemperature(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

//   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
// }

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
