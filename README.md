# WeatherWhiz

WeatherWhiz is a web application that fetches and displays weather data using the Yahoo Weather API. The application provides weather information such as temperature, wind conditions, atmospheric pressure, and astronomical data for any specified city.

## Features

- Real-time weather updates for any city
- Displays temperature, weather conditions, wind speed and direction, humidity, visibility, and pressure
- Shows sunrise and sunset times
- Interactive and user-friendly interface
- Background images and icons that change based on weather conditions

## Technologies Used

- HTML
- CSS
- JavaScript
- Yahoo Weather API
- Font Awesome for icons

## Installation and Usage

1. **Clone the repository:**
    ```sh
    git clone https://github.com/raahulmorya/WeatherWhiz.git
    ```

2. **Navigate to the project directory:**
    ```sh
    cd WeatherWhiz
    ```

3. **Open the `index.html` file in your web browser:**
    ```sh
    open index.html
    ```

## API Key

To use the Yahoo Weather API, you need an API key. Replace the placeholder API key in the `script.js` file with your own key:

```javascript
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "YOUR_API_KEY_HERE",
    "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
  },
};
