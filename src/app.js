function dateChange() {
  let date = now.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  return `${day} ${date} ${month}`;
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} mph`;
  document.querySelector("#feelsLike").innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )}°`;
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;

  //document.querySelector("#day1").innerHTML = response.data.main.temp_min;
}

function cityFind(searchInput) {
  let apiKey = "49b631c45785fe73d2a88477803dea22";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function submit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#textfield").value;
  cityFind(searchInput);
}

function searchLocation(position) {
  let crd = position.coords;
  let latitude = crd.latitude;
  let longitude = crd.longitude;

  let apiKey = "49b631c45785fe73d2a88477803dea22";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  let apiUrlTwo = `http://api.openweathermap.org/data/2.5/forecast?${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
  axios.get(apiUrlTwo).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let now = new Date();
let h2 = document.querySelector("h2");
h2.innerHTML = dateChange(now);
let form = document.querySelector("#search-form");
form.addEventListener("click", submit);
let LocationIcon = document.querySelector("#currentLocation");
LocationIcon.addEventListener("click", getCurrentLocation);

cityFind("New York");

/*let cTemp = 21;
let cToFahr = Math.round((cTemp * 9) / 5 + 32);

let fTemp = cToFahr;
let fToCel = Math.round(((fTemp - 32) * 5) / 9);

let fah = document.querySelector("#fahrenheit-link");
let cel = document.querySelector("#celsius-link");

let temperature = document.querySelector("#temperature");

fah.addEventListener("click", function () {
  temperature.innerText = cToFahr.toString();
});

cel.addEventListener("click", function () {
  temperature.innerText = fToCel.toString();
}); */
