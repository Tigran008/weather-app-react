import Forecast from './components/Forecast/Forecast';
import CountryInput from './components/CountryInput/countryInput';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import DayForecast from './components/DayForecast/DayForecast';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const [country, setCountry] = useState("Armenia");
  const [dayForecastData, setDayForecastData] = useState([]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <CountryInput setCountry={setCountry}/>
              <CurrentWeather country={ country }/>
              <Forecast country={ country } onSetDayData={setDayForecastData} />
            </>
          }
          />
          <Route path="/details/:dayId" element={<DayForecast dayForecastData={dayForecastData}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
