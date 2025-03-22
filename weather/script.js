const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherCard = document.getElementById('weather-card');
const cityNameEl = document.getElementById('city-name');
const weatherIconEl = document.getElementById('weather-icon');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const extrasEl = document.getElementById('extras');
const themeToggle = document.getElementById('theme-toggle');

// Fetch weather data
async function getWeather(city) {
  try {
    const url = 
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();

    displayWeather(data);
  } catch (err) {
    alert(err.message);
  }
}

// Display weather info
function displayWeather(data) {
  const { name } = data;
  const { icon, description, main } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  cityNameEl.textContent = name;
  weatherIconEl.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  weatherIconEl.alt = description;
  temperatureEl.textContent = `${Math.round(temp)}°C`;
  descriptionEl.textContent = capitalize(description);
  extrasEl.innerHTML = `
    💧 Humidity: ${humidity}% <br>
    🌬 Wind: ${speed} m/s
  `;

  weatherCard.classList.remove('hidden');
}

// Capitalize first letter of each word
function capitalize(str) {
  return str
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '🌞' : '🌙';
});

// Event listener
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city !== '') {
    getWeather(city);
  }
});

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});
