import Forecast from './components/Forecast/Forecast';
import CountryInput from './components/CountryInput/countryInput';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import { useState } from 'react';
import './App.css';

function App() {
  const [country, setCountry] = useState("Armenia")

  return (
    <div className="App">
      <CountryInput setCountry={setCountry}/>

      <CurrentWeather country={ country }/>

      <Forecast country={country} />
    </div>
  );
}

export default App;
