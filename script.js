const apiKey = "cdf3fe6585305f2c28044acdd6fcd3ad"; // Replace with your API key
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        alert("Error fetching weather data. Please try again.");
        console.error(error);
    }
}

function updateWeather(data) {
    document.getElementById("city-name").textContent = data.name;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("weather-description").textContent = `Description: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind-speed").textContent = `Wind Speed: ${data.wind.speed} m/s`;

    const iconCode = data.weather[0].icon;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Change background based on weather condition
    document.body.classList.remove("sunny", "cloudy", "rainy", "snowy","misty"); // Remove any previous class
    const weatherCondition = data.weather[0].main.toLowerCase();

    if (weatherCondition.includes("clear")) {
        document.body.classList.add("sunny");
    } else if (weatherCondition.includes("cloud")) {
        document.body.classList.add("cloudy");
    } else if (weatherCondition.includes("rain")) {
        document.body.classList.add("rainy");
    } else if (weatherCondition.includes("snow")) {
        document.body.classList.add("snowy");
    } else if (weatherCondition.includes("mist")|| weatherCondition.includes("haze") || weatherCondition.includes("fog")) {
            document.body.classList.add("misty");
    }
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
    else alert("Please enter a city name.");
});

// Dark Mode Toggle
const modeToggle = document.getElementById("mode-toggle");
modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        modeToggle.textContent = "Toggle Light Mode";
    } else {
        modeToggle.textContent = "Toggle Dark Mode";
    }
});
