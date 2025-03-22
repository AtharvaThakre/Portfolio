const apiKey = "f170abe618fd7725a4b61cd4eff628cc";

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data); // For debugging
      displayWeather(data);
    })
    .catch(err => {
      console.error("Error fetching weather:", err);
    });
}

function error() {
  alert("Unable to retrieve your location.");
}

function displayWeather(data) {
  const weatherBox = document.querySelector(".weather-box");
  const city = data.name;
  const temp = data.main.temp;
  const desc = data.weather[0].description;

  weatherBox.innerHTML = `
    <h2>${city}</h2>
    <p>${temp}°C</p>
    <p>${desc}</p>
  `;
}
