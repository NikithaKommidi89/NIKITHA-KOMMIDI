import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");

    console.log("Weather request for city:", city); 

    if (!city) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    const API_KEY = process.env.OPENWEATHER_API_KEY;
    console.log("API Key exists:", !!API_KEY); 

    if (!API_KEY) {
      console.error('OpenWeather API key not found');


      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    console.log("Fetching URL:", url.replace(API_KEY, 'HIDDEN')); 

    const response = await fetch(url);
    console.log("OpenWeather response status:", response.status); 

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenWeather error:", errorText);
      return NextResponse.json({ error: "error fetching" }, { status: 404 });
    }

    const data = await response.json();
    console.log("Weather data received:", data.name, data.main.temp); 


    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}