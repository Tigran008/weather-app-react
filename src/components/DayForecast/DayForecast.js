import errorImg from '../../images/errorimg.png';
import { Flex, Button } from "antd";
import { useEffect, useState } from "react";
import { Typography, Card } from "antd";
import './dayForecast.css';

import { useParams } from "react-router";
import { Link } from 'react-router-dom';

const { Meta } = Card;

const { Text, Title } = Typography;

const DayForecast = ({ allData, isError }) => {
    const [dayForecastData, setDayForecastData] = useState([]);
    const [hourData, setHourData] = useState([]);
    const [activeCardIndex, setActiveCardIndex] = useState(null);
    const { dayId } = useParams();

    useEffect(() => {
        const handleSetData = () => {
            if (allData && allData.length > 0) {
                const dayData = allData.filter(item => item.dt_txt.includes(dayId)); 
                if (dayData.length > 0) {
                    setDayForecastData(dayData); 
                    setHourData(dayData[0]);
                    setActiveCardIndex(0); 
                }
            }
        };

        handleSetData(); 
    }, [allData, dayId]);


    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);   
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = date.getDay();

        return daysOfWeek[dayOfWeek]; 
    }

    if (hourData.length === 0 || isError) {
        return (
            <div className="day_weather" style={{textAlign: "center"}}>
                <Title level={2} style={{color: "red"}}>Sorry, No data available for this day.</Title>
                <img src={errorImg} className="error_image" alt="sorry"/>
            </div>
        )
    }
    
    return ( 
        <Flex vertical align="center">
            <Flex className="day_weather" align="center" justify="space-around">
                <Flex align="center">
                    <img 
                        src={`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@4x.png`} 
                        style={{ width: 150 }} 
                        alt="weather icon"
                    />
                    <Text style={{ fontSize: 50, fontWeight: 700, marginRight: 30 }}>
                        {Math.floor(hourData.main.temp)} °C
                    </Text>
                </Flex>

                <Flex vertical>
                    <Text style={{ fontSize: 20 }}>Humidity: {hourData.main.humidity} %</Text>
                    <Text style={{ fontSize: 20 }}>Wind: {Math.floor(hourData.wind.speed)} km/h</Text>
                </Flex>

                <Flex vertical>
                    <Text style={{ fontSize: 30, fontWeight: 700 }}>
                        {getDayOfWeek(hourData.dt_txt)}, {hourData.dt_txt.split(" ")[1].slice(0, 5)}
                    </Text>
                    <Text style={{ fontSize: 25 }}> {hourData.weather[0].description} </Text>
                </Flex>
            </Flex>

            <Flex justify="center" wrap="wrap">
                {dayForecastData.map((forecast, index) => (
                    <Card
                        className={activeCardIndex === index ? 'forecast_card active' : 'forecast_card'}
                        key={index}
                        onClick={() => {
                            setHourData(forecast);
                            setActiveCardIndex(index); 
                        }} 
                        style={{
                            width: 150,
                            margin: 10,
                        }}
                        cover={
                            <Flex justify="center" align="center" style={{ height: 70 }}>
                                <img 
                                    alt={forecast.weather[0].description} 
                                    src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} 
                                    style={{ width: 80 }} 
                                />
                            </Flex>
                        }
                    >
                        <Meta 
                            title={forecast.dt_txt.split(" ")[1].slice(0, 5)} 
                            description={`${Math.floor(forecast.main.temp)} °C`}  
                        />
                    </Card>
                ))}
            </Flex>
            
            <Link to="/">
                <Button type="primary" style={{marginTop: 30, marginBottom: 30}}>← Back</Button>
            </Link>

        </Flex>
    );
};

export default DayForecast;