import './currentWeather.css';
import errorImg from '../../images/errorimg.png';
import { Typography, Flex, Spin } from 'antd';
import { getCurrentWeather } from '../../services/weatherService';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;

const CurrentWeather = ({ country }) => {
    const [currentWeatherData, setCurrentWeatherData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const getCurrentTime = () => {
        const date = new Date();
        return date.toLocaleTimeString();
    }

    useEffect(() => {
        const getCurrentWeatherData = async () => {
            setLoading(true); // Start loading
            setIsError(false);
            
            try {
                const data = await getCurrentWeather(country);
                if (data) {
                    setCurrentWeatherData({
                        city: data?.name || "N/A",
                        country: data?.sys?.country || "N/A",
                        main: data?.weather?.[0]?.main || "N/A",
                        icon: data?.weather?.[0]?.icon || "01d",
                        wind: data?.wind?.speed || "N/A",
                        humidity: data?.main?.humidity || "N/A",
                        temp: data?.main?.temp ? Math.trunc(data.main.temp) : "N/A",
                        feels_like: data?.main?.feels_like ? Math.trunc(data.main.feels_like) : "N/A",
                        pressure: data?.main?.pressure || "N/A",
                        visibility: data?.visibility ? data.visibility / 1000 : "N/A",
                    });

                    setLoading(false)                
                } else {
                    setLoading(false);
                    setIsError(true);
                }
            } catch(error) {
                console.error("Failed to fetch weather data.");
            }
            
        };

        getCurrentWeatherData();
    }, [country]);

    if(isError) {
        return (
            <div className="current_weather" style={{textAlign: "center"}}>
                <Title level={2} style={{color: "red"}}>Sorry, this place doesn't exist :(</Title>
                <Title level={3}>We can't seem to find the country(city) you're looking for</Title>
                <img src={errorImg} className="error_image" alt="sorry"/>
            </div>
        )
    }

    if (loading) {
        return (
            <Spin tip="Loading..." size="large" style={{ marginTop: 40, marginBottom: 40 }}/>
        );
    }
 
    return (
        <Flex vertical className="current_weather">
            <Flex justify="space-between" align="center">
                <Title level={5} style={{fontWeight: "bold"}}>Current Weather</Title>
                <Text strong> {getCurrentTime()} </Text>
            </Flex>

            <Flex justify="center">
                <Title level={2} mark>{currentWeatherData.city}, {currentWeatherData.country}</Title>
            </Flex>

            <Flex align="center" justify="space-evenly">
                <Text style={{ fontSize: 60, fontWeight: 700, marginRight: 30 }}>{currentWeatherData.temp} °C</Text>
                <img 
                    src={`https://openweathermap.org/img/wn/${currentWeatherData.icon}@4x.png`} 
                    style={{width: 200}} 
                    alt="weather icon"
                />
                <Flex vertical>
                    <Text style={{ fontSize: 25, fontWeight: 600 }}>{currentWeatherData.main}</Text>
                    <Text style={{ fontSize: 18 }}>Feels like {currentWeatherData.feels_like}°</Text>
                </Flex>
            </Flex>
            
            <Flex justify="space-evenly" style={{ marginTop: 20 }}>
                <Flex vertical>
                    <Text style={{ fontSize: 20 }}>Wind</Text>
                    <Text style={{ fontWeight: 700, fontSize: 20 }}>{currentWeatherData.wind} km/h</Text>  
                </Flex>

                <Flex vertical>
                    <Text style={{ fontSize: 20 }}>Humidity</Text>
                    <Text style={{ fontWeight: 700, fontSize: 20 }}>{currentWeatherData.humidity}%</Text>  
                </Flex>

                <Flex vertical>
                    <Text style={{ fontSize: 20 }}>Visibility</Text>
                    <Text style={{ fontWeight: 700, fontSize: 20 }}>{currentWeatherData.visibility} km</Text>  
                </Flex>

                <Flex vertical>
                    <Text style={{ fontSize: 20 }}>Pressure</Text>
                    <Text style={{ fontWeight: 700, fontSize: 20 }}>{currentWeatherData.pressure} mb</Text>  
                </Flex>
            </Flex>
        </Flex>
    );
}

export default CurrentWeather;
