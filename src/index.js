// Feature 1
let apiKey = "75d3f29d3c1cf7708a13f39b7d546112";
let now = new Date();

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
console.log(now.getDay());

let hour = now.getHours();
console.log(hour);

let minute = now.getMinutes();
console.log(minute);

let p = document.querySelector("#date");
p.innerHTML = ` ${day} ${hour}:${minute} `;

// Feature 2
/*Add a search engine, when searching for a city (i.e. Paris),
 display the city name on the page after the user submits the form.*/

function searchForm(event) {
  event.preventDefault();
  // input //
  let input = document.querySelector("#select");
  let cityName = input.value.trim();
  if (cityName !== "") {
    let btn = document.getElementById("search-btn");
    btn.classList.add("search-btn-loading");
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    axios.get(`${apiUrl}`).then(function (response) {
      document.getElementById("country").textContent = cityName;
      let temperature = Math.round(response.data.main.temp);
      let theTemperature = document.querySelector("#temperature-value");
      theTemperature.innerHTML = `${temperature}°C`;
      let humidity = response.data.main.humidity;
      let theHumidity = document.querySelector("#humidity");
      theHumidity.innerHTML = `Humidity : ${humidity}%`;
      let wind = response.data.wind.speed;
      let theWind = document.querySelector("#wind");
      theWind.innerHTML = `Wind : ${wind} km/h`;
      btn.classList.remove("search-btn-loading");
    });
  }
}

let form = document.getElementById("search-form");
form.addEventListener("submit", searchForm);

// currentBtn

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  console.log(lat);
  let lon = position.coords.longitude;
  console.log(lon);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(function (response) {
    console.log(response);
    document.getElementById("country").textContent = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let theTemperature = document.querySelector("#temperature-value");
    theTemperature.innerHTML = `${temperature}°C`;
    let humidity = response.data.main.humidity;
    let theHumidity = document.querySelector("#humidity");
    theHumidity.innerHTML = `Humidity : ${humidity}%`;
    let wind = response.data.wind.speed;
    let theWind = document.querySelector("#wind");
    theWind.innerHTML = `Wind : ${wind} km/h`;
  });
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationBtn = document.querySelector("#location-btn");
locationBtn.addEventListener("click", getCurrentPosition);
