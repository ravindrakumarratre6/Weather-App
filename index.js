// Get references to HTML elements
const locationInput = document.getElementById("locationInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const unitToggle = document.getElementById("unitToggle");
const weatherData = document.getElementById("weatherData");
console.log(unitToggle)
// Add event listener for the Get Weather button
getWeatherBtn.addEventListener("click", () => {
    const location = locationInput.value;
    const unit = unitToggle.value;
console.log(unit)
    // Your OpenWeatherMap API key (replace with your own)
    const apiKey = "d372aab78544ae3674d9614de25f99bc"; // Replace with your actual API key
    // API URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`;

    // Fetch weather data
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Weather data not found.");
            }
            return response.json();
        })
        .then(data => {
            const { main, wind, weather } = data;
            const temperature = main.temp;
            const humidity = main.humidity;
            const windSpeed = wind.speed;
            const weatherDescription = weather[0].description;

            // Convert temperature to Celsius or Fahrenheit based on the unit selected
            const temperatureInCelsius = unit === "metric" ? temperature - 273.15 : (temperature - 273.15) * 9/5 + 32;
            const temperatureUnit = unit === "metric" ? "C" : "F";
          
            // Display weather data with the converted temperature
            weatherData.innerHTML = `
                <h2 class="location">Weather in ${location}</h2>
                <hr class="line">
                <p class="Temp">Temperature: ${temperatureInCelsius.toFixed(2)}°${temperatureUnit}</p>
                <p class="Humidity">Humidity: ${humidity}%</p>
                <p class="Wind-Speed">Wind Speed: ${windSpeed} m/s</p>
                <p class="Description">Description: ${weatherDescription}</p>
            `;
        })
        .catch(error => {
            weatherData.innerHTML = `<p class="error-message">${error.message}</p>`;
        });
});
