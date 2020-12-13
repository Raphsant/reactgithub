import React, { useEffect, useState } from "react";
import { usersCollection } from "../data/firebase";

import Conditions from "./conditions/conditions";

/**
 * This module will be connected the open weather API and will fetch for weather data based on the location provided by the user*/

const Weather = (props) => {
  const user = props.user;
  const [responseObj, setResponseObj] = useState({});
  const [city, setCity] = useState("");

  async function getCity() {
    usersCollection
      .doc(user.uid)
      .get()
      .then(function (doc) {
        const data = doc.data();
        setCity(data.city);
      });
    return city;
  }

  let [unit] = useState("imperial");

  function GetWeather() {
    getCity();
    useEffect(() => {
      fetch(
        `https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&units=${unit}`,
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
    }, [city]);
  }

  return (
    <div onLoad={GetWeather()}>
      <Conditions responseObj={responseObj} />
    </div>
  );
};

export default Weather;
