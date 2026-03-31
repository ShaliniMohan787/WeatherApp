const apiKey = "5c7c051c58913091beda15aed74121ff"; // 🔥 replace this



const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

async function getWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data); // debug

    // ❌ error handling
    if (data.cod !== 200) {
      alert(data.message);
      return;
    }

    displayWeather(data);

  } catch (error) {
    alert("Something went wrong!");
    console.log(error);
  }
}

function displayWeather(data) {
  document.getElementById("weatherCard").classList.remove("hidden");

  document.getElementById("city").innerText =
    `${data.name}, ${data.sys.country}`;

  document.getElementById("temp").innerText =
    `${data.main.temp}°C`;

  document.getElementById("condition").innerText =
    data.weather[0].description;

  document.getElementById("humidity").innerText =
    `${data.main.humidity}%`;

  document.getElementById("wind").innerText =
    `${data.wind.speed} m/s`;

  const today = new Date();
  document.getElementById("date").innerText =
    today.toDateString();
}