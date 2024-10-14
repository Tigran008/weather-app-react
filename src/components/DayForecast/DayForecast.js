import { Flex } from "antd";
import { useState } from "react";
import { Typography, Card } from "antd";
import './dayForecast.css';

const { Meta } = Card;

const { Text } = Typography;

const DayForecast = ({ dayForecastData }) => {
    const [hourData, setHourData] = useState(dayForecastData[0])

    console.log(hourData);

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);   
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = date.getDay();

        return daysOfWeek[dayOfWeek]; 
    }

    if (!hourData) {
        return <h1>Day not found</h1>
    }
    
    return ( 
        <Flex vertical align="center">
            <Flex className="day_weather" align="center" justify="space-around">
                <Flex align="center">
                    <img 
                        src={`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@4x.png`} 
                        style={{width: 150}} 
                        alt="weather icon"
                    />
                    <Text style={{ fontSize: 50, fontWeight: 700, marginRight: 30 }}>{Math.floor(hourData.main.temp)} °C</Text>
                </Flex>

                <Flex vertical>
                    <Text style={{ fontSize: 20 }}>Humidity: {hourData.main.humidity} %</Text>
                    <Text style={{ fontSize: 20 }}>Wind: {Math.floor(hourData.wind.speed)} km/h</Text>
                </Flex>

                <Flex vertical>
                    <Text style={{ fontSize: 30, fontWeight: 700 }}>{getDayOfWeek(hourData.dt_txt)}, {hourData.dt_txt.split(" ")[1]}</Text>
                    <Text style={{ fontSize: 25 }}> {hourData.weather[0].description} </Text>
                </Flex>

            </Flex>

            <Flex justify="center" wrap="wrap">
                {dayForecastData.map((forecast, index) => (
                    <Card
                        key={index}
                        onClick={() => setHourData(dayForecastData[index])}
                        hoverable
                        style = {{
                        width: 150,
                        margin: 10,
                        }}
                        cover = {
                        <Flex justify="center" align="center" style={{ height: 70 }}>
                        <img alt={forecast.description} src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} style={{ width: 80 }} />
                        </Flex>
                        }
                    >
                        <Meta 
                            title={forecast.dt_txt.split(" ")[1]} 
                            description={`${Math.floor(forecast.main.temp)} °C`}  
                        />
                    </Card>
                ))}
            </Flex>
        </Flex>

        
    )
}

export default DayForecast;