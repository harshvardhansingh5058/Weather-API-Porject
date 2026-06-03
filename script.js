// script.js
// CONFIG object config.js se aata hai

const apiKey = "89b6a045b4b64ae382345813263005";// api key 

document.getElementById("cityInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = document.getElementById("cityInput").value;
    fetchWeather(city)  // sirf city print
  }
});

const fetchWeather = async (city) => {
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

const showWeather = (data) => {
  const result = document.getElementById("weatherResult");
  result.innerHTML = "";

  const cityHeading = document.createElement("h2");
  cityHeading.textContent = `📍 ${data.location.name}, ${data.location.country} (${data.location.localtime})`;
  cityHeading.style.cssText = "color:white; text-align:center; grid-column: 1/-1; font-size:22px;";
  result.appendChild(cityHeading);

  const tempCard = document.createElement("div");
  tempCard.className = "weather-card";
  tempCard.innerHTML = `
    <h3>🌡️ Temperature</h3>
    <p>${data.current.temp_c}°C</p>
    <span>Feels like ${data.current.feelslike_c}°C</span>
  `;

  const condCard = document.createElement("div");
  condCard.className = "weather-card";
  condCard.innerHTML = `
    <h3>☁️ Condition</h3>
    <p style="font-size:48px">${getEmoji(data.current.condition.text)}</p>
    <span>${data.current.condition.text}</span>
  `;

  const humCard = document.createElement("div");
  humCard.className = "weather-card";
  humCard.innerHTML = `
    <h3>💧 Humidity</h3>
    <p>${data.current.humidity}%</p>
    <span>Pressure: ${data.current.pressure_mb} hPa</span>
  `;

  const windCard = document.createElement("div");
  windCard.className = "weather-card";
  windCard.innerHTML = `
    <h3>💨 Wind</h3>
    <p>${data.current.wind_kph} km/h</p>
    <span>Direction: ${data.current.wind_dir}</span>
  `;

  const uvCard = document.createElement("div");
  uvCard.className = "weather-card";

  uvCard.innerHTML = `
    <h3>☀️ UV Index</h3>
    <p>${data.current.uv}</p>
    <span>UV Level</span>
    `;

  const visibilityCard = document.createElement("div");
  visibilityCard.className = "weather-card";

  visibilityCard.innerHTML = `
      <h3>👀 Visibility</h3>
      <p>${data.current.vis_km} km</p>
      <span>Visibility Range</span>
      `;

  const cloudCard = document.createElement("div");
  cloudCard.className = "weather-card";

  cloudCard.innerHTML = `
      <h3>☁️ Cloud Cover</h3>
      <p>${data.current.cloud}%</p>
      <span>Cloud Coverage</span>
      `;

  const pressureCard = document.createElement("div");
  pressureCard.className = "weather-card";

  pressureCard.innerHTML = `
    <h3>🌡️ Pressure</h3>
    <p>${data.current.pressure_mb}</p>
    <span>hPa</span>
    `;

  result.appendChild(tempCard);
  result.appendChild(condCard);
  result.appendChild(humCard);
  result.appendChild(windCard);
  result.appendChild(uvCard);
  result.appendChild(visibilityCard);
  result.appendChild(cloudCard);
  result.appendChild(pressureCard);
};



// Condition ke hisaab se emoji
const getEmoji = (description) => {
  const desc = description.toLowerCase();
  if (desc.includes("clear") || desc.includes("sunny")) return "☀️";
  if (desc.includes("cloud")) return "☁️";
  if (desc.includes("rain")) return "🌧️";
  if (desc.includes("thunderstorm") || desc.includes("thunder")) return "⛈️";
  if (desc.includes("snow")) return "❄️";
  if (desc.includes("haze") || desc.includes("mist")) return "🌫️";
  return "🌤️";
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