// script.js

const apiKey = "f170abe618fd7725a4b61cd4eff628cc"; // Replace with your actual OpenWeatherMap API key
const weatherBox = document.querySelector(".weather-box");
const appContainer = document.querySelector(".app-container");

// Mapping weather conditions to background class
function getWeatherClass(condition) {
  condition = condition.toLowerCase();
  if (condition.includes("clear")) return "sunny";
  if (condition.includes("cloud")) return "cloudy";
  if (condition.includes("rain")) return "rainy";
  if (condition.includes("storm") || condition.includes("thunder")) return "stormy";
  if (condition.includes("snow")) return "snowy";
  return "default";
}

// Fetch weather using geolocation
function fetchWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Weather data not found");
      return response.json();
    })
    .then(data => {
      updateUI(data);
    })
    .catch(error => {
      weatherBox.innerHTML = `<p style="color:white;">Error: ${error.message}</p>`;
    });
}

// Update DOM with weather info
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
    <img class="weather-icon" src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather icon" />
    <div class="temperature">${temp}°C</div>
    <div class="description">${description}</div>
    <div class="details">
      <p>Humidity: ${humidity}%</p>
      <p>Wind: ${wind} km/h</p>
    </div>
  `;
}

// Get user's current location
function getLocationAndWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        weatherBox.innerHTML = `<p style="color:white;">Location access denied. Cannot show weather data.</p>`;
      }
    );
  } else {
    weatherBox.innerHTML = `<p style="color:white;">Geolocation not supported by your browser.</p>`;
  }
}

// Trigger on page load
document.addEventListener("DOMContentLoaded", getLocationAndWeather);
