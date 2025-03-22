const apiKey = "f170abe618fd7725a4b61cd4eff628cc";
const weatherBox = document.querySelector(".weather-box");
const appContainer = document.querySelector(".app-container");

function getWeatherClass(condition) {
  condition = condition.toLowerCase();
  if (condition.includes("clear")) return "sunny";
  if (condition.includes("cloud")) return "cloudy";
  if (condition.includes("rain")) return "rainy";
  if (condition.includes("storm") || condition.includes("thunder")) return "stormy";
  if (condition.includes("snow")) return "snowy";
  return "default";
}

function fetchWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(res => res.json())
    .then(data => updateUI(data))
    .catch(() => {
      weatherBox.innerHTML = `<p style="color:red;">Failed to fetch weather data.</p>`;
    });
}

function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(res => res.json())
    .then(data => updateUI(data))
    .catch(() => {
      weatherBox.innerHTML = `<p style="color:red;">Unable to fetch weather for fallback city.</p>`;
    });
}

function getLocationAndWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        fetchWeather(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        console.warn("Geolocation blocked. Falling back to Mumbai.");
        fetchWeatherByCity("Mumbai");
      }
    );
  } else {
    console.warn("Geolocation not supported. Falling back to Mumbai.");
    fetchWeatherByCity("Mumbai");
  }
}

function updateUI(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const humidity = data.main.humidity;
  const wind = data.wind.speed;
  const city = data.name;

  const weatherClass = getWeatherClass(description);
  appContainer.className = `app-container ${weatherClass}`;

  weatherBox.innerHTML = `
    <h1>${city}</h1>
    <img class="weather-icon" src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}" />
    <div class="temperature">${temp}°C</div>
    <div class="description">${description}</div>
    <div class="details">
      <p>Humidity: ${humidity}%</p>
      <p>Wind: ${wind} km/h</p>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", getLocationAndWeather);
