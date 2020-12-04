import React, { useEffect, useState } from "react";
import { usersCollection } from "../data/firebase";

import Conditions from "./conditions/conditions";

/**
 * This module will be connected the open weather API and will fetch for weather data based on the location provided by the user*/

const Weather = () => {
  const [responseObj, setResponseObj] = useState({});
  
  const [city, setCity] = useState(null);
  // docRef
  //   .get()
  //   .then(function (doc) {
  //     const data = doc.data();
  //     setCity(data.city);
  //     localStorage.setItem("city", city);
  //   })
  //   .catch(function (error) {
  //     console.log("Error getting document:", error);
  //   });
  let [unit] = useState("imperial");

  function GetWeather() {
    useEffect(() => {
      fetch(
        `https://community-open-weather-map.p.rapidapi.com/weather?q=chicago&units=${unit}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "8663513905msh5590d4c73aa2beap1ac33cjsn8972ecb9adec",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
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
