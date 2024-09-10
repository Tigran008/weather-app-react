const API_KEY = "b66f1d2a55421f6ece1910f32bb665c2"

const getForecastData = async (cityname) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${API_KEY}&units=metric`)
       if (!response.ok) {
           throw new Error("Network response was not ok");
       }
       const data = await response.json();
       return data;
    } catch(error) {
        console.log("Faied to fetch weather forecat data:", error);
    }
}

const getCurrentWeather = async (cityname) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`)
        if (!response.ok) {
            throw new Error("Network response was not ok");
        } 
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("Faied to fetch weather forecat data:", error);
    }
}


export { getForecastData, getCurrentWeather };