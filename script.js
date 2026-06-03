// script.js
// CONFIG object config.js se aata hai

const apiKey = "89b6a045b4b64ae382345813263005";// api key
const errorMsg = document.getElementById("errorMsg");

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    errorMsg.textContent = "Please enter a city name";
    return;
  }
  errorMsg.textContent = "";
  fetchWeather(city);
  console.log("Fetching weather for:", city);
  console.log(document.getElementById("errorMsg"));

});
document.getElementById("cityInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("getWeatherBtn").click();
  }
});

const fetchWeather = async (city) => {
  if (!city) return;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city},India&days=3&aqi=yes`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.error) {

    const result =
      document.getElementById("weatherResult");

    result.innerHTML = `
    <div class="weather-card">
      <h3>❌ Error</h3>
      <p>${data.error.message}</p>
    </div>
  `;

    return;
  }
  showWeather(data)

}

// Condition ke hisaab se emoji
// const getEmoji = (description) => {
//   const desc = description.toLowerCase();
//   if (desc.includes("clear") || desc.includes("sunny")) return "☀️";
//   if (desc.includes("cloud")) return "☁️";
//   if (desc.includes("rain")) return "🌧️";
//   if (desc.includes("thunderstorm") || desc.includes("thunder")) return "⛈️";
//   if (desc.includes("snow")) return "❄️";
//   if (desc.includes("haze") || desc.includes("mist")) return "🌫️";
//   return "🌤️";
// };


function getAQIStatus(aqi) {

  switch (aqi) {

    case 1:
      return "Good";

    case 2:
      return "Moderate";

    case 3:
      return "Sensitive";

    case 4:
      return "Unhealthy";

    case 5:
      return "Very Unhealthy";

    case 6:
      return "Hazardous";

    default:
      return "Unknown";
  }
}
const showWeather = (data) => {

  const result = document.getElementById("weatherResult");
  result.innerHTML = "";

  // Heading
  const cityHeading = document.createElement("h2");

  cityHeading.textContent =
    `📍 ${data.location.name}, ${data.location.country} (${data.location.localtime})`;

  cityHeading.style.cssText =
    "color:white; text-align:center; grid-column:1/-1; font-size:22px;";

  result.appendChild(cityHeading);

  // Temperature
  const tempCard = document.createElement("div");
  tempCard.className = "weather-card";

  tempCard.innerHTML = `
    <h3>🌡️ Temperature</h3>
    <p>${data.current.temp_c}°C</p>
    <span>Feels like ${data.current.feelslike_c}°C</span>
  `;

  // Condition
  const condCard = document.createElement("div");
  condCard.className = "weather-card";

  condCard.innerHTML = `
    <h3>☁️ Condition</h3>

    <img
      src="https:${data.current.condition.icon}"
      alt="${data.current.condition.text}"
      style="width:64px;height:64px;"
    >

    <span>${data.current.condition.text}</span>
  `;

  // Humidity
  const humCard = document.createElement("div");
  humCard.className = "weather-card";

  humCard.innerHTML = `
    <h3>💧 Humidity</h3>
    <p>${data.current.humidity}%</p>
    <span>Humidity Level</span>
  `;

  // Wind
  const windCard = document.createElement("div");
  windCard.className = "weather-card";

  windCard.innerHTML = `
    <h3>💨 Wind</h3>
    <p>${data.current.wind_kph} km/h</p>
    <span>${data.current.wind_dir}</span>
  `;

  // UV
  const uvCard = document.createElement("div");
  uvCard.className = "weather-card";

  uvCard.innerHTML = `
    <h3>☀️ UV Index</h3>
    <p>${data.current.uv}</p>
    <span>UV Level</span>
  `;

  // Visibility
  const visibilityCard = document.createElement("div");
  visibilityCard.className = "weather-card";

  visibilityCard.innerHTML = `
    <h3>👀 Visibility</h3>
    <p>${data.current.vis_km} km</p>
    <span>Visibility Range</span>
  `;

  // Cloud
  const cloudCard = document.createElement("div");
  cloudCard.className = "weather-card";

  cloudCard.innerHTML = `
    <h3>☁️ Cloud Cover</h3>
    <p>${data.current.cloud}%</p>
    <span>Cloud Coverage</span>
  `;

  // Pressure
  const pressureCard = document.createElement("div");
  pressureCard.className = "weather-card";

  pressureCard.innerHTML = `
    <h3>🌡️ Pressure</h3>
    <p>${data.current.pressure_mb}</p>
    <span>hPa</span>
  `;

  // AQI
  const aqi = data.current.air_quality["us-epa-index"];

  const aqiCard = document.createElement("div");
  aqiCard.className = "weather-card";

  aqiCard.innerHTML = `
    <h3>🌫️ AQI</h3>
    <p>${aqi}</p>
    <span>${getAQIStatus(aqi)}</span>
  `;

  // Append all cards
  result.appendChild(tempCard);
  result.appendChild(condCard);
  result.appendChild(humCard);
  result.appendChild(windCard);
  result.appendChild(uvCard);
  result.appendChild(visibilityCard);
  result.appendChild(cloudCard);
  result.appendChild(pressureCard);
  result.appendChild(aqiCard);

  // Forecast Heading
  result.insertAdjacentHTML(
    "beforeend",
    `<h2 class="forecast-heading">3 Day Forecast</h2>`
  );

  // Forecast Cards
  data.forecast.forecastday.forEach((day) => {

    const forecastCard = document.createElement("div");

    forecastCard.className = "weather-card";

    forecastCard.innerHTML = `
  <h3>${day.date}</h3>

  <img
    src="https:${day.day.condition.icon}"
    alt="${day.day.condition.text}"
    style="width:48px;height:48px;"
  >

  <span>${day.day.condition.text}</span>

  <p>
    ${day.day.maxtemp_c}° / ${day.day.mintemp_c}°
  </p>
`;
    result.appendChild(forecastCard);
  });

};




// Dark theme code...

const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark-theme");

  const icon = themeBtn.querySelector("i");

  if (document.body.classList.contains("dark-theme")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }

});