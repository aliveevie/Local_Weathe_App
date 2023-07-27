import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        function(error) {
          console.error("Error getting location: " + error.message);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    // Assuming you have the temperature data in Celsius
    if (data && data.main && data.main.temp) {
      setTemperature(data.main.temp);
    }
  }, [data]);

  const celsiusToFahrenheit = (celsius) => {
    const fahrenheit = (celsius * 9/5) + 32;
    return fahrenheit;
  };

  const handleClick = () => {
    setIsCelsius(prevState => !prevState);
    if (isCelsius) {
      setTemperature(celsiusToFahrenheit(temperature));
    } else {
      setTemperature(data.main.temp);
    }
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>FreeCode Camp <br />Weather App</h1>
        {data && data.name && data.sys.country && (
          <p>{data.name}, {data.sys.country}</p>
        )}
        {temperature !== null && (
          <p>{temperature} {isCelsius ? "°C" : "°F"}</p>
        )}
        {data && data.weather && data.weather.length > 0 && (
          <div>
            <p>{data.weather[0].main}</p>
            <img src={data.weather[0].icon} alt='Weather Icon' />
          </div>
        )}
        <button onClick={handleClick}>Change temp</button>   
      </header>
    </div>
  );
}

export default App;
