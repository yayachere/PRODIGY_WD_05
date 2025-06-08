import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'
import { TbTemperature } from 'react-icons/tb'
import cloud from '../images/clouds.png';
import clear from '../images/clear.png';
import drizzle from '../images/drizzle.png';
import mist from '../images/mist.png';
import rain from '../images/rain.png';
import snow from '../images/snow.png';


var url = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&units=metric&appid=6028462a2fb6bcb60fda4f11a4afbc23';
const day = new Date().getDate();
const date = `${new Date().toLocaleString('default', { weekday: 'short' })}`;
const month = `${new Date().toLocaleString('default', { month: 'short' })}`;
const year = new Date().getFullYear();
const currentDate = `${date}, ${month} ${day} ${year}`;

const Weather = ({isDarkMode}) => {

    const [inputValue, setInputValue] = useState('Addis Ababa');
    const [city, setCity] = useState('');
    const [weatherIcon, setWeatherIcon] = useState();
    const [temp, setTemp] = useState('');
    const [humidity, setHumidity] = useState('');
    const [seaLevel, setSeaLevel] = useState('');
    const [wind, setWind] = useState('');
    const [inputGroupClass, setInputGroupClass] = useState('');
    const [condition, setCondition] = useState('');

    useEffect(() => {
        fetchWeatherData(new Event('load')); // Trigger on initial load
    }, []);

    async function fetchWeatherData(e) {

        e.preventDefault();
        if (inputValue.trim() === '') {
            setInputGroupClass('shake');
            setTimeout(() => {
                setInputGroupClass('');
            }, 500);
        }
        else {
            fetch(url + inputValue + apiKey)
                .then(response => response.json())
                .then(data => {
                    if (data.cod === '404') {
                        setInputGroupClass('shake');
                        setTimeout(() => {
                            setInputGroupClass('');
                        }, 500);
                        setCity('City You Entered is Not Found');
                    }
                    else if (data.weather[0].main === 'Clouds') {
                        setWeatherIcon(cloud);
                        setCondition("Cloudy");
                    } else if (data.weather[0].main === 'Clear') {
                        setWeatherIcon(clear);
                        setCondition("Clear");
                    } else if (data.weather[0].main === 'Drizzle') {
                        setWeatherIcon(drizzle);
                        setCondition("Drizzle");
                    } else if (data.weather[0].main === 'Mist') {
                        setWeatherIcon(mist);
                        setCondition("Misty");
                    } else if (data.weather[0].main === 'Rain') {
                        setWeatherIcon(rain);
                        setCondition("Rainy");
                    } else if (data.weather[0].main === 'Snow') {
                        setWeatherIcon(snow);
                        setCondition("Snowy");
                    }

                    setTemp(Math.round(data.main.temp) + "°C");
                    setCity(data.name + " (" + data.sys.country + ")");
                    setHumidity(data.main.humidity + "%");
                    setSeaLevel(data.main.sea_level + "hpa");
                    setWind(data.wind.speed + " Km/h");
                    setInputValue('');
                })
                .catch(error => console.error('Error fetching weather data:', error), setInputValue(''));
        }

    
    }


  return (
    <section className={`weather ${isDarkMode ? 'dark' : ''}`}>
        <div className='container'>

            <form className={`search-container ${inputGroupClass}` } onSubmit={fetchWeatherData}>
                <span><BiSearch className='icon'/></span>
                <input type="text" name='search' value={inputValue} placeholder='Search location..' 
                onChange={(e)=> setInputValue(e.target.value)}/>
            </form>

            <div className={`content-container ${isDarkMode ? 'dark' : ''}`}>
                <div className="city-name">
                    <h2 className='city'>{city}</h2>
                    <span><GoLocation /></span>
                </div>
                <div className="condition-text">
                    <h2 className='condition'>It's {condition}</h2>
                </div>
                <div className="condition">
                    <span><TbTemperature /></span>
                    <h3 className='temp'>{temp}</h3>
                    <img src={weatherIcon} alt="" className='weather-image'/>
                </div>
                <div className="date">
                    <p>{currentDate}</p>
                </div>
                <div className="details">
                    <div className="detail">
                        <h4>Humidity</h4>
                        <p className='humidity'>{humidity}</p>
                    </div>
                    <div className="detail">
                        <h4>Sea Level</h4>
                        <p className='sea-level'>{seaLevel}</p>
                    </div>
                    <div className="detail">
                        <h4>Wind Speed</h4>
                        <p className='wind'>{wind}</p>
                    </div>
                </div>
            </div>

        </div>

    </section>
  )
}

export default Weather