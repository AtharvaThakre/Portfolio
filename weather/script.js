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
    .then(data => {
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
    })
    .catch(err => {
      console.error(err);
      weatherBox.innerHTML = `<p style="color:red;">Failed to fetch weather.</p>`;
    });
}

function getLocationAndWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        fetchWeather(pos.coords.latitude, pos.coords.longitude);
      },
      err => {
        console.warn("Location denied, using default city (London)");
        fetchFallbackCity();
      }
    );
  } else {
    fetchFallbackCity();
  }
}

function fetchFallbackCity() {
  const fallbackCity = "London";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${fallbackCity}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(res => res.json())
    .then(data => updateUI(data))
    .catch(err => {
      weatherBox.innerHTML = `<p style="color:red;">Failed to load fallback weather.</p>`;
    });
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
