import React, { useEffect, useState } from "react";

import Conditions from "./conditions/conditions";

/**
 * This module will be connected the open weather API and will fetch for weather data based on the location provided by the user*/

const Weather = () => {
  const [responseObj, setResponseObj] = useState({});
  let [unit] = useState("imperial");

  function GetWeather() {
    useEffect(() => {
      fetch(
        `https://community-open-weather-map.p.rapidapi.com/weather?q=${localStorage.getItem(
          "city"
        )}&units=${unit}`,
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
    }, []);
  }

  return (
    <div onLoad={GetWeather()}>
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
