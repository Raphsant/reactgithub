import React, { useState } from "react";
import * as OpenWeather from "openweather-apis";
import Conditions from "./conditions/conditions";
import conditions from "./conditions/conditions";

/**
 * This module will be connected the open weather API and will fetch for weather data based on the location provided by the user
 * THIS IS EXTREMELY WIP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * RIGHT NOW THIS IS JUST MAKING CALLS TO THE API
 */

const Weather = () => {
  const [responseObj, setResponseObj] = useState({});
  let [unit, setUnit] = useState('imperial')
  

  function getWeather() {
    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?q=Chicago&units=${unit}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "8663513905msh5590d4c73aa2beap1ac33cjsn8972ecb9adec",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setResponseObj(response);
      });
  }

  return (
    <div> 
      
                
      <button onClick={getWeather}>Click here to get your forecast</button>
      
      <Conditions responseObj={responseObj} />


    </div>
  );
};

export default Weather;

// function Weather() {

//     const GetWeather

//   return (
//     <div>
//            <h2>Find Current Weather Conditions</h2>
//            <div>
//                {JSON.stringify(responseObj)}
//            </div>
//            <button onClick={Weather}>Get Forecast</button>
//        </div>
//   );

// }

// export default Weather;
