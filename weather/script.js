function fetchWeather(lat, lon, mode = "hourly") {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const temps = [];
      const labels = [];

      if (mode === "hourly") {
        const hourlyData = data.hourly.slice(0, 8); // Next 24 hours (8 * 3 hours approx)
        hourlyData.forEach(entry => {
          const time = new Date(entry.dt * 1000).toLocaleTimeString([], { hour: "numeric" });
          labels.push(time);
          temps.push(entry.temp);
        });
      } else {
        const dailyData = data.daily.slice(0, 7); // Next 7 days
        dailyData.forEach(entry => {
          const day = new Date(entry.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
          labels.push(day);
          temps.push(entry.temp.day);
        });
      }

      updateChart(labels, temps);
      currentTemp.textContent = `${Math.round(temps[0])}°C`;

      // Reverse geocoding to get city name
      fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`)
        .then(res => res.json())
        .then(geoData => {
          const cityName = geoData[0]?.name || "Unknown";
          currentCity.textContent = `${cityName}`;
        });
    })
    .catch(() => {
      currentTemp.textContent = "Error loading data.";
    });
}
