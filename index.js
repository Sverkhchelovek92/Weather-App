const apiKey = "b9c4f38e842525dec4414df06ca69aa3";

const form = document.querySelector(".weather-form");
const input = document.querySelector(".city-input");
const weatherCard = document.querySelector(".weather");
const btn = document.querySelector(".btn");
const errorDiv = document.querySelector(".error");
const cityDisplay = document.querySelector(".city-name");
const tempDisplay = document.querySelector(".temperature");
const humDisplay = document.querySelector(".humidity");
const descDisplay = document.querySelector(".description");

btn.addEventListener("click", async () => {
  const city = input.value;

  if (city) {
    try {
      console.log(city);
      errorDiv.innerHTML = "";
      const weatherData = await getWeatherData(city);
      displayInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please type the name of your City");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const res = await fetch(apiUrl);

  //   console.log(res);

  if (!res.ok) {
    throw new Error("Couldn't fetch weather data");
  }

  return await res.json();
}

function displayInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  console.log(data);

  const tempC = Math.round(temp - 273.15);
  const tempF = Math.round((tempC * 9) / 5 + 32);

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${tempC} C° / ${tempF} F°`;
  humDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
}

function getEmoji(weather) {}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDiv.appendChild(errorDisplay);
}
