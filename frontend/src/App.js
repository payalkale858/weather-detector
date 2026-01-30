import { useState } from "react";
import "./App.css";
import axios from "axios";


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async()=> {setError("");
    setWeather(null);

    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    axios.get(`http://127.0.0.1:8000/api/weather/?city=${city}`)
    .then((responce)=>{
      setWeather(responce.data)
    })
    .catch((error)=>{
      alert("Server not responding. Try again later.")

    })

    // try {
    //   const response = await fetch(`http://127.0.0.1:8000/api/weather/?city=${city}`);

    //   const data = await response.json();

    //   if (!response.ok) {
    //     setError("Please check the spelling or enter a valid city");
    //     return;
    //   }setWeather(data);
    // } catch (err) {
    //   setError("Server not responding. Try again later.");
    // }
  };

  return (
    <div id="main">
      <h1>Weather Detector</h1>
      <div id="ontainer" style={{ textAlign: "center", marginTop: "15px" }}>

        <h1>Enter Location</h1>
        <input type="text" placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <br /><br />

        <button onClick={fetchWeather}>Get Weather</button>

        {/* Error message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/*Weather data */}
        {weather && (
          <div>
            <h3>{weather.city}</h3>
            <p>Temperature: {weather.temperature}°C</p>
            <p>Condition: {weather.description}</p>
            <p>Humidity: {weather.humidity}%</p>
          </div>
        )}
      </div>
    </div>

  );
}

export default App;


