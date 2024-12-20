# Weather APP

## Overview

Weather APP is a simple app that helps users check real-time weather conditions and a 5-day forecast for any city around the world.

### Problem Space

Unlike more sophisticated weather apps, The Weather APP focuses on providing essential weather data in a clean and user-friendly.

### User Profile

This app is designed for a diverse range of customers, including travelers who need up-to-date weather information for their destinations, outdoor enthusiasts who depend on forecasts for planning activities, and everyday users seeking a quick way to check the weather.

### Features

•	Current Weather: Displays the current temperature, weather conditions, and humidity for a search location.
•	5-Day Forecast: Shows a summary of the next five days, including temperature highs and lows.
•	Location Search: Users can search by city name or allow the app to detect their current location.
•	Weather Icons: Visual representation of weather conditions (e.g., sun, clouds, rain).

## Implementation

### Tech Stack

•	Frontend: React.js for dynamic rendering and user interface.
•	Styling: SCSS or TailwindCSS for a clean design.
•	Libraries: Axios for API requests.

### APIs

API
•	OpenWeather API: https://openweathermap.org/api

Endpoints
•	/weather: Current weather data for a city.
•	/forecast: 5-day forecast.

### Sitemap

•	Home Page: Displays current weather for the user's location or a default city.
•	Search Results Page: Shows weather details for a searched city.
•	Forecast Page: Displays a detailed 5-day weather forecast.

### Mockups

 
### Data

Current Weather API Response Example:
{
  "weather": [{ "description": "clear sky", "icon": "01d" }],
  "main": { "temp": 298.15, "humidity": 60 },
  "name": "Toronto"
}

5-Day Forecast API Response Example:

{
  "list": [
    {
      "dt_txt": "2023-01-01 12:00:00",
      "main": { "temp": 298.15 },
      "weather": [{ "description": "cloudy", "icon": "03d" }]
    }
  ]
}

### Endpoints

1.	GET /weather/:city
a.	Example Response:

{
  "temperature": "20°C",
  "condition": "Sunny"
}

2.	GET /forecast/:city
a.	Example Response:

[
  { "date": "2023-01-01", "high": "22°C", "low": "15°C", "condition": "Rainy" }
]

## Roadmap

Week 1: 
•	Set up project structure and integrate API for current weather.
•	Add 5-day forecast and implement search functionality.
Week 2: 
•	Style the app with SCSS and add weather icons.
•	Testing, debugging, and deployment.


## Future Implementations

Weather Alerts: Notify users of severe weather conditions.
Daily Tips: Provide suggestions based on weather (e.g., "Carry an umbrella today!").
Multi-Language Support: Localize the app for different regions.

