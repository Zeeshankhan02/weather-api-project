import express from "express";
import "dotenv/config";
import fetch from "node-fetch"; // If you're on Node < 18

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3002;

async function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;
  const response = await fetch(url);
  return await response.json();
}

app.get("/api/weather", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://zeeshankhan02.github.io");
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const data = await fetchWeatherData(city);
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
