import { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState(null);
  
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
    }
  }, [latitude, longitude]);

  
  return (
    <div className="App">
      <header className="App-header">
      <h1>FreeCode Camp <br></br>Weather App</h1>
      <p>{data.name}, {data.sys.country}</p>
      <p>{data.main.temp} °C</p>
      <p>{data.weather[0].main}</p>
      <img src={data.weather[0].icon} alt='Wheather Icon' />
         
          

      </header>
    </div>
  );
}

export default App;
