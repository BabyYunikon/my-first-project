// Feature 1
let apiKey = "75d3f29d3c1cf7708a13f39b7d546112";
let currentUnit = 'celcius'
let now = new Date(Date.now());
let currentTemperature = 22;
let selectedUnit = 'celcius';


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

let hour = now.toLocaleTimeString().split(':')[0]

let minute =  now.toLocaleTimeString().split(':')[1]


let p = document.querySelector("#date");
p.innerHTML = ` ${day} ${hour}:${minute}`;

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
      currentTemperature = Math.round(response.data.main.temp);
      //set the temperature according to selected unit
      setTemperature();
      //change weather description
      let weatherDescription = response.data.weather[0].description;      
      document.getElementById("description").textContent = weatherDescription;
      let weatherIcon = response.data.weather[0].icon;
      document.getElementById("image").setAttribute('src', `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
      
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
    currentTemperature = Math.round(response.data.main.temp);
     //set the temperature according to selected unit
     setTemperature();
     //change weather description
     let weatherDescription = response.data.weather[0].description;    
     document.getElementById("description").textContent = weatherDescription;
     //change weather icon
    let weatherIcon = response.data.weather[0].icon;
    document.getElementById("image").setAttribute('src', `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
    let humidity = response.data.main.humidity;
    let theHumidity = document.querySelector("#humidity");
    theHumidity.innerHTML = `Humidity : ${humidity}%`;
    let wind = response.data.wind.speed;
    let theWind = document.querySelector("#wind");
    theWind.innerHTML = `Wind : ${wind} km/h`;
  });
}

function getCurrentPosition() {
    console.log('getCurrentPosition')
  navigator.geolocation.getCurrentPosition(showPosition, (err)=>{
    console.log(err)
  });
}

let locationBtn = document.querySelector("#location-btn");
locationBtn.addEventListener("click", getCurrentPosition);

function selectCelcius(){
    console.log('select celcius')
    let celcius = document.querySelector("#celcius");
    let fahrenheit = document.querySelector("#fahrenheit");
    if(!celcius.classList.contains('temperature-value')){
        celcius.classList.add('temperature-value')
    }
    if(fahrenheit.classList.contains('temperature-value')){
        fahrenheit.classList.remove('temperature-value')
    }
    selectedUnit = 'celcius'
    setTemperature()

}
function selectFahrenheit(){
    console.log('select fahrenheit')
    let celcius = document.querySelector("#celcius");
    let fahrenheit = document.querySelector("#fahrenheit");
    if(!fahrenheit.classList.contains('temperature-value')){
        fahrenheit.classList.add('temperature-value')
    }
    if(celcius.classList.contains('temperature-value')){
        celcius.classList.remove('temperature-value')
    }
    selectedUnit = 'fahrenheit'
    setTemperature()
}

let celcius = document.querySelector("#celcius");
let fahrenheit = document.querySelector("#fahrenheit");

celcius.addEventListener('click', selectCelcius)
fahrenheit.addEventListener('click', selectFahrenheit)

function setTemperature(){
    let theTemperature = document.querySelector("#temperature-value");
    if(selectedUnit === 'fahrenheit'){
        theTemperature.innerHTML = `${Math.round(currentTemperature*1.8 + 32)}°`;
        return
    }
    theTemperature.innerHTML = `${currentTemperature}°`;
}

showPosition({coords: {latitude: -18.8710912, longitude: 47.5004928}})