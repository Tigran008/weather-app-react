import { getForecastData } from "../../services/weatherService";
import { Card, Flex } from "antd";
import { useState, useEffect } from "react";

const { Meta } = Card;

const Forecast = ({ country }) => {
  const [forecastData, setForecastData] = useState([]);

useEffect(() => {
  const handleGetData = async () => {
    try {
      const data = await getForecastData(country);
      const dailyData = processDailyForecast(data.list);
      setForecastData(dailyData);
    } catch(error) {
      console.log(error, ">>>>");
    } 
  } 

  handleGetData();
}, [country])

const processDailyForecast = (list) => {
  const dailyData = {}

  list.forEach((forecast) => {
    const date = forecast.dt_txt.split(' ')[0];

    if(!dailyData[date]){
      dailyData[date] = {
        date: date,
        minTemperature: forecast.main.temp_min,
        maxTemperature: forecast.main.temp_max,
        description: forecast.weather[0].description,
        icon: forecast.weather[0].icon,
      }
    } else {
      dailyData[date].minTemperature = Math.min(dailyData[date].minTemperature, forecast.main.temp_min);
      dailyData[date].maxTemperature = Math.max(dailyData[date].maxTemperature, forecast.main.temp_max);
    }

    dailyData[date].minTemperature = Math.trunc(dailyData[date].minTemperature); 
    dailyData[date].maxTemperature = Math.trunc(dailyData[date].maxTemperature);
  });

  return Object.values(dailyData).slice(0, 5);
}

return (
    <Flex justify="center" wrap="wrap">
      {forecastData.map((forecast, index) => (
        <Card
          key={index}
          hoverable
          style = {{
            width: 150,
            margin: 10,
          }}
          cover = {
          <Flex justify="center" align="center" style={{ height: 70 }}>
            <img alt={forecast.description} src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`} style={{ width: 80 }} />
          </Flex>
          }
      >
        <Meta 
          title={forecast.date} 
          description={`Min: ${forecast.minTemperature} °C - Max: ${forecast.maxTemperature} °C`} 
        />
      </Card>
      ))}
    </Flex>
  );
}

export default Forecast;