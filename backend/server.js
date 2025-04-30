import express from "express"
import "dotenv/config"
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors({
  Access-Control-Allow-Origin:"https://zeeshankhan02.github.io/weather-api-project/",
  origin:"*"
}))
const PORT = process.env.PORT || 3002

async function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;

  const response = await fetch(url);

  const data = await response.json();
  return data;
}

app.get('/health', async (req, res) => {
  res.json("Working")
}

app.get('/', async (req, res) => {
  const { city } = req.query; // ✅ fixed
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const data = await fetchWeatherData(city);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});


app.listen(PORT,()=>{
  console.log(`Server Running on port ${PORT}`);
})
