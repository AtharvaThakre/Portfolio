const apiKey = "f170abe618fd7725a4b61cd4eff628cc";
const currentTemp = document.getElementById("current-temp");
const currentCity = document.getElementById("current-city");
const forecastContainer = document.getElementById("forecast-container");
const modeToggle = document.getElementById("mode-toggle");
const theme = document.body;

let chartInstance;
const ctx = document.getElementById("forecast-chart").getContext("2d");

const chartData = {
  labels: [],
  datasets: [{
    label: "Temperature (°C)",
    data: [],
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "#4bc0c0",
    borderWidth: 2,
    fill: true,
    tension: 0.4,
    pointBackgroundColor: "#fff"
  }]
};

function createChart() {
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { ticks: { color: "#ccc" }, grid: { display: false } },
        y: { ticks: { color: "#ccc" }, grid: { color: "#333" } }
      }
    }
  });
}

function updateChart(labels, temps) {
  chartData.labels = labels;
  chartData.datasets[0].data = temps;
  createChart();
}

function fetchWeather(lat, lon, mode = "hourly") {
  const endpoint = mode === "hourly" ? "forecast" : "forecast/daily";
  const cnt = mode === "hourly" ? 8 : 7; // 8 * 3hr blocks (24hrs), 7 days
  const url = `https://api.openweathermap.org/data/2.5/${endpoint}?lat=${lat}&lon=${lon}&cnt=${cnt}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const temps = [];
      const labels = [];

      if (mode === "hourly") {
        data.list.forEach(entry => {
          const time = new Date(entry.dt * 1000).toLocaleTimeString([], { hour: "numeric" });
          labels.push(time);
          temps.push(entry.main.temp);
        });
      } else {
        data.list.forEach(entry => {
          const date = new Date(entry.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
          labels.push(date);
          temps.push(entry.temp.day);
        });
      }

      updateChart(labels, temps);
      currentTemp.textContent = `${Math.round(temps[0])}°C`;
      currentCity.textContent = `${data.city.name}, ${data.city.country}`;
    })
    .catch(() => {
      currentTemp.textContent = "Error loading data.";
    });
}

function getLocationAndWeather(mode = "hourly") {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        fetchWeather(latitude, longitude, mode);
      },
      () => {
        currentTemp.textContent = "Location access denied.";
      }
    );
  } else {
    currentTemp.textContent = "Geolocation not supported.";
  }
}

forecastContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("forecast-toggle")) {
    document.querySelectorAll(".forecast-toggle").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    const mode = e.target.getAttribute("data-mode");
    getLocationAndWeather(mode);
  }
});

modeToggle.addEventListener("click", () => {
  theme.classList.toggle("dark-mode");
  theme.classList.toggle("light-mode");
});

document.addEventListener("DOMContentLoaded", () => {
  getLocationAndWeather("hourly");
});
