function displayForecast(response) {
  let forecast = response.data.daily;

  let preceptionElement = document.querySelector("#precipitation span");
  rainP = response;
  preceptionElement.innerHTML = rainP * 100;
}

function getForecast(coordinates) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,daily&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let weatherPic = document.querySelector("#icon");
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#cityName");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity span");
  let windElement = document.querySelector("#wind span");

  console.log(response.data.weather[0].main);

  switch (response.data.weather[0].main) {
    case "Clear":
    case "01d":
      weatherPic.src = "https://cdn-icons-gif.flaticon.com/6455/6455017.gif";
      break;

    case "Clear":
    case "01n":
      weatherPic.src = "https://cdn-icons-gif.flaticon.com/6455/6455031.gif";
      break;

    case "Clouds":
      weatherPic.src = "https://cdn-icons-gif.flaticon.com/6455/6455053.gif";
      break;

    case "Rain":
      weatherPic.src = "https://cdn-icons-gif.flaticon.com/6455/6455055.gif";
      break;

    case "Drizzle":
      weatherPic.src = "https://cdn-icons-gif.flaticon.com/6455/6455057.gif";
      break;

    case "Thunderstorm":
      weatherPic.src = "https://cdn-icons-gif.flaticon.com/6455/6455012.gif";
      break;

    case "Snow":
      weatherPic.src = "https://cdn-icons-gif.flaticon.com/6454/6454998.gif";
      break;

    case "Mist":
      weatherPic.src = "https://cdn-icons-gif.flaticon.com/6454/6454995.gif";
      break;

    default:
      weatherPic.src = "";
  }

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);

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

function showfahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsius.classList.remove("active");
  faherat.classList.add("active");
  let fahrenheitConvert = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitConvert;
}

function showcelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsius.classList.add("active");
  faherat.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let faherat = document.querySelector("#fahrenheit");
faherat.addEventListener("click", showfahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showcelsius);

searchCity("London");
