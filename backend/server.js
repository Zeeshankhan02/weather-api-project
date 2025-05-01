import express from "express"
import "dotenv/config"
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors({
  origin: "https://zeeshankhan02.github.io" // ✅ Only allow your GitHub Pages site
}));

const PORT = process.env.PORT || 3002

async function fetchWeatherData(city) {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}";

  const response = await fetch(url);

  const data = await response.json();
  return data;
}

app.get("/health", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ status: "Server is up and CORS is working" });
});


app.get('/', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://zeeshankhan02.github.io");
  
  const { city } = req.query;
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
  console.log(Server Running on port ${PORT});
})
