const cityInput = document.getElementById("city-input");
const getWheatherBtn = document.getElementById("get-weather-btn");
const weatherInfo = document.getElementById("weather-info");
const cityNameDisplay = document.getElementById("city-name");
const temperatureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");
const errorMessage = document.getElementById("error-message");

const handleWeatherRequest=async () => {
  if (cityInput.value === "") return;
  const city = cityInput.value.trim();
  try {
    const data = await fetchWeatherData(city);
    displayData(data);
  } catch (error) {
    showError()
  }
}

getWheatherBtn.addEventListener("click",handleWeatherRequest);

cityInput.addEventListener('keydown',(e)=>{
  if(e.key=='Enter'){
  handleWeatherRequest()}
}
)

async function fetchWeatherData(city) {
  try {
     const response = await fetch(`https://weather-api-project-gray.vercel.app/api/weather?city=${encodeURIComponent(city)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
  }
}



function displayData(data) {
  const { name, main, weather } = data;
  cityNameDisplay.textContent = name;
  temperatureDisplay.textContent = `
    Temperature: ${main.temp} degrees
    `;
  descriptionDisplay.textContent = weather[0].description;
  cityInput.value=''
  weatherInfo.classList.remove("hidden");
  errorMessage.classList.add("hidden");
}

function showError(){
  weatherInfo.classList.add("hidden");
  errorMessage.classList.remove("hidden");
}
