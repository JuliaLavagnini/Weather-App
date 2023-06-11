function iconNameFunction(iconName) {
  switch (iconName) {
    case "01d":
      return "media/sunny.png";
    case "01n":
      return "media/full-moon.png";
    case "02d":
      return "media/cloudy-day.png";
    case "02n":
      return "media/cloudy-night.png";
    case "03d":
      return "media/cloudy.png";
    case "03n":
      return "media/cloudy.png";
    case "04d":
      return "media/cloudy.png";
    case "04n":
      return "media/cloudy.png";
    case "09d":
      return "media/drizzle.png";
    case "10d":
      return "media/rain.png";
    case "11d":
      return "media/lightning-bolt.png";
    case "013d":
      return "media/snowing.png";
    default:
      return "media/fog.png";
  }
}

function daysName(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    let iconName = forecastDay.weather[0].icon;

    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
        <img
          src=${iconNameFunction(iconName)}
          alt="${iconName}"
          width="42px"
          id="forecast-icon"
        />
        <p>
          <span id="forecast-min"> ${Math.round(forecastDay.temp.min)}°</span> /
          <span id="forecast-max">${Math.round(forecastDay.temp.max)}°</span>
        </p>
        <p class="day">${daysName(forecastDay.dt)}</p>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let weatherPic = document.querySelector("#icon");
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#cityName");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity span");
  let windElement = document.querySelector("#wind span");
  let minTemperatureElement = document.querySelector("#min");
  let maxTemperatureElement = document.querySelector("#max");

  let iconName = response.data.weather[0].icon;

  weatherPic.src = iconNameFunction(iconName);

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  minTemperatureElement.innerHTML = Math.round(response.data.main.temp_min);
  maxTemperatureElement.innerHTML = Math.round(response.data.main.temp_max);

  getForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-text");
  searchCity(cityInputElement.value);
}

function searchCity(city) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("London");
