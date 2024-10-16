import Forecast from './components/Forecast/Forecast';
import CountryInput from './components/CountryInput/countryInput';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import DayForecast from './components/DayForecast/DayForecast';
import { getForecastData } from './services/weatherService';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const [country, setCountry] = useState("Armenia");
  const [allData, setAllData] = useState([]);
  const [isError, setIsError] = useState(false)


  useEffect(() => {
  
    const handleGetData = async () => {  
      setIsError(false);

      try {
        const data = await getForecastData(country);
        setAllData(data.list);
      } catch(error) {
        setIsError(true)
        console.log(error, ">>>>");
      } 
    } 
    
    handleGetData();
  }, [country])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <CountryInput setCountry={setCountry}/>
              <CurrentWeather country={ country } isError={ isError }/>
              <Forecast allData={ allData } isError={ isError }/>
            </>
          }
          />
          <Route path="/details/:dayId" element={<DayForecast allData={ allData } isError={ isError }/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
